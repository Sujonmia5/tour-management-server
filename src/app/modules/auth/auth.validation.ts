import { z } from "zod";

// Auth validation schemas will be added here
export const LoginZodSchema = z.object({
  email: z.string("Email must be a string").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
