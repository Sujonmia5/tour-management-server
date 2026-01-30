import express, { Application } from "express";
import cors from "cors";
import { ApiRouter } from "./app/routes";
import "./app/config/passport";
import passport from "passport";
import session from "express-session";
import { config } from "./app/config/config";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFoundHandler from "./app/middleware/notFound";
import cookieParser from "cookie-parser";

const app: Application = express();

// Middleware
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

// Test Routes
app.get("/", (_req, res) => {
  res.send("API is running...");
});

// API Routes
app.use("/api/v1", ApiRouter);

// Not Found Handler
app.use(notFoundHandler);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
