"use server"

import { stripe } from "@/lib/stripe"
import { connectedAccountSchema } from "@/lib/validation/connect";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

export  async function stripeSetup(context: z.infer<typeof connectedAccountSchema>) {
  const supabase = createClient();
  try {
      const profile = connectedAccountSchema.parse(context);
      const { data: { user }} = await supabase.auth.getUser();
  
      const account = await stripe.accounts.create({
          email: user?.email,
          controller: {
            losses: {
              payments: "application"
            },
            fees: {
              payer: "application"
            },
            requirement_collection: "stripe",
            stripe_dashboard: {
              type: "express"
            }
          }
      })
  
      const { data, error } = await supabase
      .from('profiles')
      .update({
          connectedAccountId: account.id
      })
      .eq("id", profile.id)
      // .single();



      if (error) {
          console.log(error);
          return false;
        }
        return true;
      
      
  } catch (error) {
      if (error instanceof z.ZodError) {
          console.log(error);
          return false;
        }
        return false;
  }


}

export async function removeStripe() {
  const supabase = createClient()
  try {
    const { data: { user }} = await supabase.auth.getUser();
      
    const account = await stripe.accounts.retrieve()
    console.log(account?.id)
    const {data, error} = await supabase
    .from('profiles')
    .delete()
    .eq("connectedAccountId", account?.id)


    if (error) {
      console.log(error);
      return false;
    }
    return true;
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);
      return false;
    }
    return false;
  }
}


export async function onboardStripe(){
  const supabase = createClient();
  try {
    const { data: { user }} = await supabase.auth.getUser();
    const {data, error} = await supabase
    .from('profiles')
    .select("connectedAccountId")
    .eq("id", user?.id)

    if(data) {
      const profile = data[0]
      const accountLink = await stripe.accountLinks.create({
        account: profile?.connectedAccountId as string,
        refresh_url: "http://localhost:3000/protected/finances",
        return_url: "http://localhost:3000/protected/finances",
        type: "account_onboarding"
      })
      return redirect(accountLink?.url)
    }



  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);
      return false;
    }
    return false;
  }
}
