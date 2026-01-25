/* eslint-disable no-unused-vars */
import { RequestHandler } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notFoundHandler: RequestHandler = (req, res, _next) => {
  res.status(404).json({
    statusCode: 404,
    success: false,
    message: `Cannot find ${req.originalUrl} on this server`,
  });
};

export default notFoundHandler;
