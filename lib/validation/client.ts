import { z } from "zod";

export const clientSchema = z.object({
    name: z.string().min(2, {
        message: "Client's Name must be at least 2 characters.",
    }),
    email: z.string().email(),
    mobile: z.string().optional(),
    address: z.string().optional(),
    profile_id: z.string().optional()
})