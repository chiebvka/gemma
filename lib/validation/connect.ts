import { z } from "zod";

export const ConnnectAccountFormSchema = z.object({
    id: z.string(),
    connectedAccountId: z.string().optional()
})


export const connectedAccountSchema = z.object({
    id: z.string(),
    connectedAccountId: z.string().optional()
})