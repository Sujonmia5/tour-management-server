import { z } from "zod";

export const createDivisionZodSchema = z.object({
  name: z.string("Name must be a string").min(1, "Name cannot be empty"),
  slug: z.string().optional(),
  thambnail: z.string().optional(),
  description: z.string().optional(),
});
