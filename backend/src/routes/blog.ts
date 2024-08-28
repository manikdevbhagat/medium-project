import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@manikdevbhagat/common/dist";
import { authenticateUser } from "../middleware/authenticateUser";
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    searchText: string;
  };
}>();

blogRouter.use("/*", authenticateUser);

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const authorId = c.get("userId");
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ message: "Invalid input" });
  }
  try {
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        published: false,
        publishedAt: new Date(),
        authorId: authorId,
      },
    });
    return c.json({ blog });
  } catch (e) {
    c.status(403);
    return c.json({ message: "Error creating blog" });
  }
});
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const searchText = c.req.query("q");
  const blogs = await prisma.post.findMany({
    where: {
      published: true,
      title: {
        contains: searchText,
        mode: "insensitive", // Make the search case-insensitive
      },
    },
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      publishedAt: true,
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      publishedAt: "desc",
    },
  });
  return c.json({ blogs });
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blog = await prisma.post.findFirst({
    where: { id: id },
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      publishedAt: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return c.json({ blog });
});

blogRouter.put("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogId = c.req.param("id");
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ message: "Invalid input" });
  }
  try {
    const updatedBlog = await prisma.post.update({
      where: { id: blogId },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({ updatedBlog });
  } catch (e) {
    c.status(403);
    return c.json({ message: "Error updating blog" });
  }
});
