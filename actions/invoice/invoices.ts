"use server"

import { InvoiceEditFormSchema } from "@/lib/validation/invoice";
import { createClient } from "@/utils/supabase/server";
import { stripe } from '@/lib/stripe';
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



export async function payInvoice(invoiceData: z.infer<typeof InvoiceEditFormSchema>){
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("connectedAccountId")
        .eq("id", user.id)
        .single();

    if (!profile?.connectedAccountId) {
        throw new Error("Stripe account not connected");
    }

    try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: 'Invoice Payment',
                },
                unit_amount: Math.round(invoiceData?.totalAmount * 100), // Convert to cents
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url:   process.env.NODE_ENV === "development"
          ? "http://localhost:3000/protected/status"
          : "https://marshal-ui-yt.vercel.app/payment/success",
          // `${process.env.NEXT_PUBLIC_BASE_URL}/invoices/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url:   process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://marshal-ui-yt.vercel.app/payment/cancel",
          //  `${process.env.NEXT_PUBLIC_BASE_URL}/invoices/cancel`,
          payment_intent_data: {
            application_fee_amount: Math.round(invoiceData?.totalAmount * 100)* 0.01, // Set your application fee
            transfer_data: {
              destination: profile.connectedAccountId,
            },
          },
        });
    
        return { url: session.url };
      } catch (error) {
        console.error('Error creating checkout session:', error);
        return null;
      }
    

}


export async function getIssuedInvoices(){
  const supabase = createClient();
  try {
      const {data: { user } } = await supabase.auth.getUser();

      const {data: invoice, error} = await supabase 
        .from("invoices")
        .select("*")
        .eq('profile_id', user?.id)

        return invoice

  } catch (error) {
      console.log(error);
      return null;
  }
}


export async function getInvoice(context:z.infer<typeof InvoiceEditFormSchema>){
  const supabase = createClient();
  try {
    const invoiceDetails = InvoiceEditFormSchema.parse(context)
    const {data: { user } } = await supabase.auth.getUser();

    const {data: invoice, error} = await supabase 
      .from("invoices")
      .select("*")
      .eq('profile_id', user?.id)

      return invoice

} catch (error) {
    console.log(error);
    return null;
}
}