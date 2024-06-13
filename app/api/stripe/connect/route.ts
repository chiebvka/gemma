import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export default async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;
    let event;
    try {
        try {
            event = stripe.webhooks.constructEvent(
              body,
              signature,
              process.env.STRIPE_CONNECT_WEBHOOK_SECRET as string
            );
          } catch (error: unknown) {
            return new Response("webhook error", { status: 400 });
          }
        
    } catch (error) {
        
    }
    try {
        const account =  await stripe.accounts.create({});
        return new Response(JSON.stringify({ account: account.id }))
    } catch (error: any) {
        console.error('An error occurred when calling the Stripe API to create an account:', error);
        return new Response(`Account creation webhook error: ${error.message}`, { status: 400 })
    }
}