import { z } from "zod";

export const createTourTypeZodSchema = z.object({
  name: z.string("Name must be a string").min(1, "Name cannot be empty"),
});
