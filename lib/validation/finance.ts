import { z } from "zod";


export const FinanceFormSchema = z.object({
    id: z.string(),
    connectedAccountId: z.string()
})