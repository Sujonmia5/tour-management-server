import { z } from "zod";

/**
 * User create validation schema
 */
export const createUserZodSchema = z.object({
  name: z.string("Name must be a string").min(1, "Name cannot be empty"),
  email: z.string("Email must be a string").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
  address: z.string().optional(),
});
