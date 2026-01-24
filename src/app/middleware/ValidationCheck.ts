import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";
import { CatchAsync } from "../utils/CatchAsync";

export const ValidationCheck = (schema: ZodObject) => {
  return CatchAsync(
    async (req: Request, _res: Response, next: NextFunction) => {
      await schema.parseAsync(req.body);
      next();
    },
  );
};
