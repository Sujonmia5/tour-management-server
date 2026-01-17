/* eslint-disable no-console */
/* eslint-disable no-undef */
import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import { config } from "./app/config/config";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.DATABASE_URL);

    // Start server
    server = app.listen(config.PORT, () => {
      console.log(`Server is running on port: ${config.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
(async () => {
  await main();
})();

process.on("SIGINT", () => {
  console.log("SIGINR Received, Shutting Down gracefully..");
  if (server) {
    server.close(() => {
      console.log("server close");
    });
  }
});

process.on("SIGTERM", () => {
  console.log("SIGTERM Received, Shutting Down gracefully..");
  if (server) {
    server.close(() => {
      console.log("server close");
    });
  }
});

process.on("unhandledRejection", () => {
  console.log("Catch UnhandledRejection Shutting down gracefully...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log("Catch uncaughtException, Shutting down gracefully...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
