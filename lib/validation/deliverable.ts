import { z } from "zod";


export const deliverableTitleSchema = z.object({
    title: z.string().min(2, {
        message: "Deliverable title must be at least 2 characters.",
    }),
    id: z.string().optional(),
    project_id: z.string().optional()
})


export const deliverableOrder = z.object({
    id: z.string(),
    project_id: z.string(),
    profile_id: z.string(),
    position: z.number(),
})

export const completeDeliverable = z.object({
    id: z.string(),
    project_id: z.string(),
    profile_id: z.string(),
    isComplete: z.boolean()
})

export const reorderDeliverablesSchema = z.object({
    list: z.array(deliverableOrder),
  });

export const deliverableSchema = z.object({
    title: z.string().min(2, {
        message: "Deliverable title must be at least 2 characters.",
    }),
    id: z.string().optional(),
    description: z.string().min(2, {
        message: "Deliverable title must be at least 2 characters.",
    }),
    dueDate: z.date({
        required_error: "A due date is required.",
    }),
    position: z.number(),
    project_id: z.string(),
    amount: z.number()
})