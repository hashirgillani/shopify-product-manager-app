// @ts-check
import express from "express";
import cors from "cors";

import { validateAuthenticatedSession } from "./middleware/auth.middleware.js";
import authRouter from "./router/auth.router.js";
import webhookRouter from "./router/webhook.router.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(authRouter);
app.use(webhookRouter);

app.use("/api/*", validateAuthenticatedSession);

app.use(express.json());

export { app };