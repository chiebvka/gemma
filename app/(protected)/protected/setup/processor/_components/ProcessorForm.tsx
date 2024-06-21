"use client"

import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ClockIcon } from 'lucide-react';
import { stripe } from '../../../../../../lib/stripe/index';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import { getStripeDashboard } from '@/actions/finances/setup';
import { Tables } from '@/types/supabase';

type Profile = Tables<'profiles'>;
interface Props  {
  userDetails: Profile,
  // stripeAccount: string,
}
export default function ProcessorForm({userDetails}: Props) {
  // async function stripeDashboard() {
  //   const response = awai
  // }
  return (
    <div className='space-y-3  rounded-lg'>
        <Card className="w-full bg-gradient-to-r space-y-4 from-[#6366F1] to-[#8B5CF6] text-white shadow-lg">
            <CardHeader>
                <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Icons.stripe
                    className="h-6 w-6 filter drop-shadow"
                    />
                    <h3 className="text-sm md:text-lg font-medium">Stripe</h3>
                </div>
                <Badge className="bg-white text-[#6366F1] font-medium" >
                    Connected
                </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                <p className="text-xs md:text-sm">Your Stripe account is currently connected and ready to accept payments.</p>
                <div className="flex items-center justify-between">
                  {/* <form action={getStripeDashboard}>

                  </form> */}
                    <Button type='submit' className="bg-white text-[#6366F1] text-xs md:text-sm hover:bg-gray-100" asChild size="sm" variant="outline">
                      <Link href={`https://dashboard.stripe.com/b/${userDetails?.connectedAccountId}`} target='_blank'>
                        View Dashboard
                      </Link>
                    </Button>
                    <div className="flex space-x-2 items-center gap-2">
                    <ClockIcon className="h-4 w-4 hidden md:flex" />
                    <span className="text-xs md:text-sm"> Since May 21, 2024</span>
                    </div>
                </div>
                </div>
            </CardContent>
        </Card>
        {/* <Card className="w-full max-w-md bg-gradient-to-r from-[#00C1A5] to-[#00A3A3] text-white shadow-lg">
            <CardHeader>
                <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                    alt="Paystack Logo"
                    className="h-8 w-8 filter drop-shadow"
                    height={32}
                    src="/placeholder.svg"
                    style={{
                        aspectRatio: "32/32",
                        objectFit: "cover",
                    }}
                    width={32}
                    />
                    <h3 className="text-lg font-medium">Paystack</h3>
                </div>
                <Badge className="bg-white text-[#00C1A5] font-medium" >
                    Not Connected
                </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                <p className="text-sm">
                    You haven't connected your Paystack account yet. Connect your account to start accepting payments.
                </p>
                <div className="flex items-center justify-between">
                    <Button className="bg-white text-[#00C1A5] hover:bg-gray-100" size="sm" variant="outline">
                    Connect Paystack
                    </Button>
                    <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4" />
                    <span className="text-sm">Not connected</span>
                    </div>
                </div>
                </div>
            </CardContent>
        </Card>
        <Card className="w-full max-w-md bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              alt="Lemon Squeezy Logo"
              className="h-8 w-8 filter drop-shadow"
              height={32}
              src="/placeholder.svg"
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width={32}
            />
            <h3 className="text-lg font-medium">Lemon Squeezy</h3>
          </div>
          <Badge className="bg-white text-[#F59E0B] font-medium" >
            Not Connected
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm">
            You haven't connected your Lemon Squeezy account yet. Connect your account to start accepting payments.
          </p>
          <div className="flex items-center justify-between">
            <Button className="bg-white text-[#F59E0B] hover:bg-gray-100" size="sm" variant="outline">
              Connect Lemon Squeezy
            </Button>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4" />
              <span className="text-sm">Not connected</span>
            </div>
          </div>
        </div>
      </CardContent>
        </Card>
        <Card className="w-full max-w-md bg-gradient-to-r from-[#0070BA] to-[#0077B6] text-white shadow-lg">
        <CardHeader>
            <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <img
                alt="PayPal Logo"
                className="h-8 w-8 filter drop-shadow"
                height={32}
                src="/placeholder.svg"
                style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                }}
                width={32}
                />
                <h3 className="text-lg font-medium">PayPal</h3>
            </div>
            <Badge className="bg-white text-[#0070BA] font-medium">
                Not Connected
            </Badge>
            </div>
        </CardHeader>
        <CardContent>
            <div className="space-y-2">
            <p className="text-sm">
                You haven't connected your PayPal account yet. Connect your account to start accepting payments.
            </p>
            <div className="flex items-center justify-between">
                <Button className="bg-white text-[#0070BA] hover:bg-gray-100" size="sm" variant="outline">
                Connect PayPal
                </Button>
                <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4" />
                <span className="text-sm">Not connected</span>
                </div>
            </div>
            </div>
        </CardContent>
        </Card> */}
    </div>
  )
}