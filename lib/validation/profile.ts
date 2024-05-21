import { z } from "zod";


export const ProfileFormSchema = z.object({
    userName: z.string().optional(),
    email: z.string(),
    companyName: z.string().min(2, {
        message: "Business Name must be at least 2 characters.",
      }),
    companyEmail: z.string().email({ message: "Invalid email address" }),
    companyMobile: z.string().optional(),
    companyAddress: z.string().optional(),
    logoLink: z.string().optional(),
    paymentStatus: z.boolean().optional(),
})


export const profileSchema = z.object({
    id: z.string(),
    email: z.string().optional(),
    companyName: z.string(),
    companyEmail: z.string().email(),
    companyMobile: z.string(),
    companyAddress: z.string(),
    paymentStatus: z.boolean().optional(),
    logoLink: z.string().optional(),
  });