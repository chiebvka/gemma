import { stripe } from "@/lib/stripe";
import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

export  async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;
    let event;

      try {
          event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET as string
          );
        } catch (error: unknown) {
          return new Response("webhook error", { status: 400 });
        }
        

        switch (event.type) {
          case "account.updated": {
            const account = event.data.object;

            const supabase = createClient();
            const { data: { user }} = await supabase.auth.getUser();
            const {data: userDetails, error} = await supabase
            .from('profiles')
            .upsert({    
              paymentStatus:
              account.capabilities?.transfers === "pending" ||
              account.capabilities?.transfers === "inactive"
                ? true
                : false})
            .eq("id", user?.id)
            .single()

            break;
          }
          default: {
            console.log("unhandled event");
          }
        }

        return new Response(null, { status: 200 });
}