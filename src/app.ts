import express, { Application } from "express";
import cors from "cors";
import { ApiRouter } from "./app/routes";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (_req, res) => {
  res.send("API is running...");
});

app.use("/api/v1", ApiRouter);

export default app;
