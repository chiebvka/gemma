"use server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function signUp(formData: FormData)  {
  

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = createClient();

 
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

  //   const accountDetails = await stripe.accounts.create({
  //     email: email as string,
  //     controller: {
  //       losses: {
  //         payments: "application",
  //       },
  //       fees: {
  //         payer: "application",
  //       },
  //       stripe_dashboard: {
  //         type: "express",
  //       },
  //     },
  // })



    // const { data: userProfile, error: profileError } = await supabase
    // .from('profiles')
    // .update({
    //     connectedAccountId: accountDetails.id
    // })




    if (error) {
      return redirect("/signup?status=error");
    }

    return redirect("/signup?status=success");
  };