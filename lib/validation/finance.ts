import { z } from "zod";

export const FinanceFormSchema = z.object({
    paymentName: z.string(),
    isActive: z.boolean()
})