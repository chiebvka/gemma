'use client'

import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tables } from '@/types/supabase';
import { usePathname, useRouter } from 'next/navigation';
import { createStripePortal } from '@/lib/stripe/stripeAction';
import Link from 'next/link';


type Subscription = Tables<'subscriptions'>;
type Price = Tables<'prices'>;
type Product = Tables<'products'>;

type SubscriptionWithPriceAndProduct = Subscription & {
  prices:
    | (Price & {
        products: Product | null;
      })
    | null;
};

interface Props {
  subscription: SubscriptionWithPriceAndProduct | null;
}

export default function SubscriptionSetupForm({ subscription }: Props) {
    const router = useRouter();
    const currentPath = usePathname()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.prices?.currency!,
      minimumFractionDigits: 0
    }).format((subscription?.prices?.unit_amount || 0) / 100);

  const handleStripePortalRequest = async () => {
    setIsSubmitting(true);
    const redirectUrl = await createStripePortal(currentPath);
    setIsSubmitting(false);
    return router.push(redirectUrl);
  };
  return (
    <div className='space-y-3 border-2 border-black rounded-lg'>
        <Card x-chunk="dashboard-04-chunk-1">
            <CardHeader>
            <CardTitle>Manage Subscription</CardTitle>
            <CardDescription>
               {        subscription
          ? <span className='space-x-3'> You are currently on the  <span className='font-bold text-black'>{subscription?.prices?.products?.name}</span> plan. which cost
           <Button> {subscriptionPrice}/{subscription?.prices?.interval}</Button>
           </span>
          : 'You are not currently subscribed to any plan.'}
            </CardDescription>
            </CardHeader>
            <CardContent>
            {/* <form>
                <Input placeholder="Store Name" />
            </form> */}
            </CardContent>
            <CardFooter className="border-t-2 border-t-black flex flex-col md:flex-row-reverse space-y-3 md:justify-between px-6 py-4">
              <div>{subscription ? (
                <>
                </>
        ) : (
          <Button>  
          <Link href="/pricing">Choose your plan</Link>
        </Button>
        )} </div>  
        {subscription ?        <Button
                onClick={handleStripePortalRequest}
                loading={isSubmitting}>
                    Manage your subscription on stripe
            </Button> : ''}
     
            </CardFooter>
        </Card>
    </div>
  )
}