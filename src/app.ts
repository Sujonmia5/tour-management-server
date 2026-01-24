import express, { Application } from "express";
import cors from "cors";
import { ApiRouter } from "./app/routes";
import "./app/config/passport";
import passport from "passport";
import session from "express-session";
import { config } from "./app/config/config";

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
app.use(cors({ origin: "*" }));

app.get("/", (_req, res) => {
  res.send("API is running...");
});

app.use("/api/v1", ApiRouter);

export default app;
