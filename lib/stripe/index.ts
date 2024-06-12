import Stripe from "stripe";

export const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY_LIVE ?? process.env.STRIPE_SECRET_KEY ?? '',
    {
    // process.env.NEXT_STRIPE_SECRET_KEY ?? '', {
    apiVersion: '2024-04-10',
    // appInfo: {
    //     name: 'Alphabexo',
    //     version: '0.1.0',
    //     url: 'http://localhost:3000/pricing'
    // }

})