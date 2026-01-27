import { z } from "zod";

export const createTourZodSchema = z.object({
  title: z.string("Title must be a string").min(1, "Title cannot be empty"),
  description: z
    .string("Description must be a string")
    .min(1, "Description cannot be empty"),
  images: z.array(z.string()).optional(),
  location: z
    .string("Location must be a string")
    .min(1, "Location cannot be empty"),
  costFrom: z.number("costFrom is required"),
  startDate: z.coerce.date("startDate is required"),
  endDate: z.coerce.date("endDate is required"),
  tourType: z
    .string("tourType must be an id string")
    .min(1, "tourType is required"),
  included: z.array(z.string()).optional(),
  excluded: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  tourPlan: z.array(z.string()).optional(),
});
