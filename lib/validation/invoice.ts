import z from "zod";
const datetime = z.string().datetime();
const invoiceItem = z.object({
    itemName: z.string().min(2, {message: "Item name must be 2 or more characters long"}),
    itemQuantity: z.union([z.string(), z.number()]).transform(Number),
    itemAmount: z.union([z.string(), z.number()]).transform(Number),
    itemPrice: z.union([z.string(), z.number()]).transform(Number),
})

export const InvoiceEditFormSchema = z.object({
    id: z.string().optional(),
    // branding: z.string().min(2, {message: "Please Upload a logo or set an account name"}),
    // senderName: z.string().min(2, {message: "Please enter a prefered or set an account name"}),
    // senderPhone: z.number().min(2, {message: "Please enter an mobile or set an account mobile"}),
    // senderEmail: z.string().email({message: "Please enter an address or set an account address"}),
    // senderAddress: z.string().min(2, {message: "Please enter a valid email address"}),
    
    companyName: z.string().optional(),
    companyEmail: z.string().optional(),
    companyAddress: z.string().optional(),
    companyMobile: z.string().optional(),
    recepientName: z.string().min(2, {message: "Please enter a prefered or set an account name"}),
    recepientEmail: z.string().email({message: "Please enter an address or set an account address"}),
    recepientAddress: z.string().min(2, {message: "Please enter an address or set an account address"}),
    recepientMobile: z.string().min(2, {message: "Please enter an mobile or set an account mobile"}),
    InvoiceID: z.string().optional(),
    tax: z.number().min(0,{message: "Tax must be at least 0"}).max(100, {message: "Tax cannot be more than 100%"}),
    subTotalAmount: z.number().optional(),
    totalAmount: z.number(),
    project_id: z.string().optional(),
    profile_id: z.string().optional(),
    notes: z.string().optional(),
    dueDate: z.date().optional(),
    // dueDate: z.date({
    //     required_error: "A due date is required"
    // }).optional(),
    logoLink: z.string().optional(),
    paymentLink: z.string().optional(),
    // paymentLink: z.string().url({ message: "Invalid url" }).optional(),
    invoiceProducts: z.array(invoiceItem).optional(),



    // itemName: z.string().min(2, {message: "Item name must be 2 or more characters long"}),
    // itemQuantity: z.number(),
    // itemAmount: z.number(),
    // InvoiceNote: z.string().optional(),
})
