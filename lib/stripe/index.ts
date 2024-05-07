import Stripe from "stripe";

export const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY ?? '', {
    apiVersion: '2024-04-10',
    appInfo: {
        name: 'Alphabexo',
        version: '0.1.0'
    }

})