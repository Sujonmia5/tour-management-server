/* eslint-disable no-console */
/* eslint-disable no-undef */
import { Server } from "http";
import app from "./app";

let server: Server;

async function main() {
  try {
    // Start server
    server = app.listen(5000, () => {
      console.log(`Server is running on port: 5000`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();

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
