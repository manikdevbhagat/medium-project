import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export async function authenticateUser(c: Context, next: Next) {
  const authHeader = c.req.header("Authorization") || "";
  if (!authHeader) {
    c.status(401);
    return c.json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  const user = await verify(token, c.env.JWT_SECRET);
  if (user) {
    const userId = user.id as string;
    c.set("userId", userId);
    await next();
  } else {
    c.status(403);
    return c.json({ message: "Unauthorized" });
  }
}
