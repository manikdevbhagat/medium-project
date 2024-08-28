import { Hono } from "hono";
import { cors } from "hono/cors";
import { authRouter } from "./routes/auth";
import { blogRouter } from "./routes/blog";
import { userRouter } from "./routes/user";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use("*", cors());

app.route("/api/v1/auth", authRouter);
app.route("/api/v1/blog", blogRouter);
app.route("/api/v1/user", userRouter);
app.get("/", (c) => {
  return c.text("Hello Hono");
});

export default app;
