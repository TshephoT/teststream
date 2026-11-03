import cors from "cors";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import type { HealthResponse } from "@teststream/shared-types";
import { env } from "./config/env.js";

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.WEB_ORIGIN }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/v1/health", (_request, response) => {
  const payload: HealthResponse = {
    status: mongoose.connection.readyState === 1 ? "ok" : "degraded",
    service: "teststream-api",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString()
  };

  response.status(payload.status === "ok" ? 200 : 503).json(payload);
});

app.use((_request, response) => {
  response.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "The requested resource was not found."
    }
  });
});
