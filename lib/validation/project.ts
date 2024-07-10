import { z } from "zod";

export const projectTitleSchema = z.object({
    name: z.string().min(2, {
        message: "Project Name must be at least 2 characters.",
      }),
    profile_id: z.string().optional(),
    id: z.string().optional()
})

export const projectNotificationSchema = z.object({
    profile_id: z.string().optional(),
    id: z.string().optional(),
    isDraft: z.boolean(),
    signature: z.boolean()
})

export const projectDescriptionSchema = z.object({
    description: z.string().min(2, {
        message: "Project Description must be at least 2 characters.",
      }),
    profile_id: z.string().optional(),
    id: z.string().optional()
})

export const projectAmountSchema = z.object({
  currency: z.string({
    required_error: "You need to select a currency type",
  }),
  amount: z.coerce.number(),
  profile_id: z.string().optional(),
  id: z.string().optional(),
})

export const projectClientSchema = z.object({
  profile_id: z.string().optional(),
  id: z.string().optional(),
  client_id: z.string()
})


export const projectSchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    profile_id: z.string().optional()
})