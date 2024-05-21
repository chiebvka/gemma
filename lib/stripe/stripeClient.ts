import { loadStripe, Stripe } from "@stripe/stripe-js";




let StripePromise:Promise<Stripe | null>
// loda stripe for sub/connected accounts to get their accout id
export const getStripe = () => {
    if(!StripePromise) {
        StripePromise = loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE ??
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ??
            ''
            // process.env.NEXT_STRIPE_PUBLISHABLE_KEY ?? '', {
            //     stripeAccount: connectedAccountId
            // }
        )
    }
    return StripePromise
}