import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { authenticateUser } from "../middleware/authenticateUser";
import { updateUserInput } from "@manikdevbhagat/common/dist";
import { hashPassword } from "../utils/password";
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    PASSWORD_SALT: string;
  };
  Variables: {
    userId: string;
  };
}>();

userRouter.use("/*", authenticateUser);

userRouter.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId = c.get("userId");
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
      },
    });
    if (user) {
      return c.json({ user });
    } else {
      c.status(404);
      return c.json({ message: "User not found" });
    }
  } catch (e) {
    c.status(500);
    return c.json({ message: "Error retrieving user details" });
  }
});

userRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId = c.get("userId");
  const body = await c.req.json();
  const { success } = updateUserInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ message: "Invalid inputs" });
  }
  try {
    const hashedPassword = await hashPassword(
      body.password,
      c.env.PASSWORD_SALT
    );
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
      select: {
        name: true,
        email: true,
      },
    });

    return c.json({ user: updatedUser });
  } catch (e) {
    c.status(500);
    return c.json({ message: "Error updating user details" });
  }
});
