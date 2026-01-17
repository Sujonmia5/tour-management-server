import express, { Application } from "express";
import cors from "cors";
const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
