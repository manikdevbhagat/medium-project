import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@manikdevbhagat/common/dist";
import { hashPassword, verifyPassword } from "../utils/password";

export const authRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    PASSWORD_SALT: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Handle user signup
authRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // Parse request body
  const body = await c.req.json();

  // Validate signup input
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ message: "Invalid inputs" });
  }

  try {
    // Check if user with the same email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (existingUser) {
      c.status(403);
      return c.json({ message: "Email already exists" });
    }
    const hashedPassword = await hashPassword(
      body.password,
      c.env.PASSWORD_SALT
    );
    // Create new user
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: hashedPassword,
      },
    });
    console.log(user);

    // Generate JWT token
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (e) {
    console.log(e);
    c.status(403);
    return c.json({ message: "Error signing up" });
  }
});

authRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ message: "Invalid credentials" });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { email: body.email },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
    if (!user) {
      c.status(403);
      return c.json({ message: "User does not exist" });
    }
    const passwordMatch = await verifyPassword(
      user.password,
      body.password,
      c.env.PASSWORD_SALT
    );
    if (!passwordMatch) {
      c.status(403);
      return c.json({ message: "Invalid password" });
    }
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (e) {
    console.log(e);
    c.status(403);
    return c.json({ message: "Error signing in" });
  }
});
