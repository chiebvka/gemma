import z from "zod";
const datetime = z.string().datetime();
const invoiceItem = z.object({
    itemName: z.string().min(2, {message: "Item name must be 2 or more characters long"}),
    itemQuantity: z.number().min(1, {message: 'Item must have at least one quantity '}),
    itemAmount: z.number(),
    itemPrice: z.number(),
})

export const InvoiceEditFormSchema = z.object({
    branding: z.string().min(2, {message: "Please Upload a logo or set an account name"}),
    senderName: z.string().min(2, {message: "Please enter a prefered or set an account name"}),
    senderEmail: z.string().email({message: "Please enter an address or set an account address"}),
    senderAddress: z.string().min(2, {message: "Please enter an address or set an account address"}),
    senderPhone: z.number().min(2, {message: "Please enter an mobile or set an account mobile"}),
    receipientName: z.string().min(2, {message: "Please enter a prefered or set an account name"}),
    receipientEmail: z.string().email({message: "Please enter an address or set an account address"}),
    receipientAddress: z.string().min(2, {message: "Please enter an address or set an account address"}),
    receipientPhone: z.number().min(2, {message: "Please enter an mobile or set an account mobile"}),
    InvoiceID: z.string().optional(),
    invoiceItems: z.array(invoiceItem),
    dueDate: z.string().datetime({ message: "Invalid datetime string! Must be UTC." }),
    itemName: z.string().min(2, {message: "Item name must be 2 or more characters long"}),
    itemQuantity: z.number(),
    itemAmount: z.number(),
    InvoiceNote: z.string().optional(),
    paymentLink: z.string().url({ message: "Invalid url" })
})
