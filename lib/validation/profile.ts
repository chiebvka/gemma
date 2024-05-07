import { z } from "zod";


export const ProfileFormSchema = z.object({
    userName: z.string().optional(),
    email: z.string(),
    companyName: z.string().optional(),
    companyEmail: z.string().optional(),
    companyMobile: z.number().optional(),
    companyAddress: z.number().optional(),
    logoLink: z.string().optional(),
    paymentStatus: z.boolean().optional(),
})