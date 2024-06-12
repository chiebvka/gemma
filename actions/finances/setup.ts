"use server"

import { connectedAccountSchema } from "@/lib/validation/connect";
import { stripe } from "@/lib/stripe"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

export  async function stripeCreate() {
  const supabase = createClient();
  try {
      // const profile = connectedAccountSchema.parse(context);
      const { data: { user }} = await supabase.auth.getUser();



    const accountDetails = await stripe.accounts.create({
      email: user?.email as string,
      controller: {
        losses: {
          payments: "application",
        },
        fees: {
          payer: "application",
        },
        stripe_dashboard: {
          type: "express",
        },
      },
  })
  
      // const account = await stripe.accounts.retrieve("acct_1PQsEr2cRxcY6H6P")
      console.log(accountDetails?.id)
      console.log(accountDetails?.object)
      console.log(accountDetails?.company)
      console.log(accountDetails?.details_submitted)
      console.log(accountDetails?.email)
      console.log(accountDetails?.external_accounts)
      
      const { data, error } = await supabase
      .from('profiles')
      .update({
          connectedAccountId: accountDetails.id
      })
      .eq("id", user?.id)
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


export async function  stripeSetup() {
  const supabase = createClient();
  try {
    const { data: { user }} = await supabase.auth.getUser();
    const { data, error } = await supabase
    .from('profiles')
    .update({
      stripeConnectLinked: true
    })
    .eq("id", user?.id)


    // const {data: userDetails, error: errorDetails} = await supabase
    // .from('profiles')
    // .select('connectedAccountId')
    // .eq("id", user?.id)
    // .single()

    // console.log(userDetails?.connectedAccountId)


    // const accountLink = await stripe.accountLinks.create({
    //   account:  userDetails?.connectedAccountId as string,
    //   refresh_url: "http://localhost:3000/protected",
    //   return_url: "http://localhost:3000/protected",
    //   type: "account_onboarding"
    // })

    // return redirect(accountLink?.url)



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
    // console.log(account?.id)
    
    const {data, error} = await supabase
    .from('profiles')
    .update({stripeConnectLinked: false})
    .eq("id", user?.id)
    .select()


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

    const { data: { user }} = await supabase.auth.getUser();
    const {data: userDetails, error} = await supabase
    .from('profiles')
    .select('connectedAccountId')
    .eq("id", user?.id)
    .single()

    console.log(userDetails?.connectedAccountId)


      const accountLink = await stripe.accountLinks.create({
        account:  userDetails?.connectedAccountId,
        refresh_url: "http://localhost:3000/protected",
        return_url: "http://localhost:3000/protected/finances",
        type: "account_onboarding"
      })

      return redirect(accountLink.url)


}
