"use server"

import { InvoiceEditFormSchema } from "@/lib/validation/invoice";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";


export async function createInvoice(context:z.infer<typeof InvoiceEditFormSchema>){
    const supabase = createClient();
    try {
        const invoice = InvoiceEditFormSchema.parse(context)
        const { data: { user }} = await supabase.auth.getUser();

        const {data: userProfile, error: profileError} = await supabase
        .from("profiles")
        .select()
        .eq("id", user?.id)
        .single()


        if(!userProfile || !userProfile?.companyName || !userProfile?.companyAddress || !userProfile?.companyEmail || !userProfile?.companyMobile) {
            const {data: updateProfile, error: updatedError} = await supabase
            .from("profiles")
            .upsert({
                companyName: invoice.companyName || userProfile?.companyName,
                companyAddress: invoice.companyAddress || userProfile?.companyAddress,
                companyEmail: invoice.companyEmail || userProfile?.companyEmail,
                companyMobile: invoice.companyMobile || userProfile?.companyMobile,
            })
            .eq("id", user?.id)
            .select()
            .single()
        }

        const { data, error } = await supabase
        .from("invoices")
        .insert({
            companyName: invoice.companyName,
            companyEmail: invoice.companyEmail,
            companyAddress: invoice.companyAddress,
            companyMobile: invoice.companyMobile,
            recepientName: invoice.recepientName,
            recepientEmail: invoice.recepientEmail,
            recepientAddress: invoice.recepientAddress,
            recepientMobile: invoice.recepientMobile,
            tax: invoice.tax,
            subTotalAmount: invoice.subTotalAmount ,
            totalAmount: invoice.totalAmount,
            notes: invoice.notes,
            dueDate: invoice.dueDate,
            logoLink: invoice.logoLink,
            paymentLink: invoice.paymentLink,
            invoiceProducts: invoice.invoiceProducts,
            profile_id: user?.id
        })
        .select()


        console.log(data)

        if (error) {
            console.log("Error inserting invoice:", error);
            return null;
        }

        if (data) {
            // If necessary, you can handle redirection or return some data
            console.log("Invoice created successfully:", data);
            // Example redirection:
            // redirect(`/invoices/${data[0].id}`);
            return data[0]; // Returning the first inserted invoice data
        } else {
            console.log("No data returned after insert");
            return null;
        }


    } catch (error) {
            console.log(error);
            return null;
    }
}
