import { app } from "./app.js";
import { env } from "./config/env.js";
import { connectToDatabase } from "./database/connect.js";

async function startServer(): Promise<void> {
  await connectToDatabase();

  const server = app.listen(env.PORT, () => {
    console.log(`TestStream API listening on http://localhost:${env.PORT}`);
  });

  const shutdown = async (signal: string): Promise<void> => {
    console.log(`${signal} received. Shutting down...`);
    server.close(async () => {
      const mongoose = await import("mongoose");
      await mongoose.default.disconnect();
      process.exit(0);
    });
  };

  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));
}

startServer().catch((error: unknown) => {
  console.error("Failed to start TestStream API:", error);
  process.exit(1);
});
