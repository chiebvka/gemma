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

export const LogoFormSchema = z.object({
    logoLink: z.string().min(2, {
      message: "Image is required",
    }),
})


export const CompanyFormSchema = z.object({
    companyEmail: z.string().email({ message: "Invalid email address" }),
    companyMobile: z.string().optional(),
    companyAddress: z.string().optional(),
})

export const CompanyNameFormSchema = z.object({
    companyName: z.string().min(2, {
      message: "Business Name must be at least 2 characters.",
    }),

})

export const profileSchema = z.object({
    id: z.string(),
    email: z.string().optional(),
    // companyName: z.string(),
    companyEmail: z.string().email(),
    companyMobile: z.string(),
    companyAddress: z.string(),
    paymentStatus: z.boolean().optional(),
    // logoLink: z.string().optional(),
  });

export const profileNameSchema = z.object({
    id: z.string(),
    companyName: z.string(),
});

export const profileLogoSchema = z.object({
    id: z.string(),
    logoLink: z.string().optional(),
});

