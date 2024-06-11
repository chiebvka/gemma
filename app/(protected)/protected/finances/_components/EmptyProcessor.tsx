import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Landmark } from 'lucide-react';
import Link from 'next/link';

type Props = {}

interface ProcessingProps {
    title: string,
    description: string
}

export default function EmptyProcessor({title, description}: ProcessingProps) {
  return (
    <div>
           <Card>
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
        {/* <CardDescription>
          Looks like you haven't connected a payment processor. Let's get you connected to a processor so you can receive payments for your invoices and contracts 
        </CardDescription> */}
        <CardDescription>
            {description}
         
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-1">
        {/* <Link href="/protected/finances/connect">
            <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
            <Landmark className="mt-px h-5 w-5" />
            <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Online</p>
                <p className="text-sm text-muted-foreground">
                Choose from a wide range of payment processors like stripe, paypal, lemonsqueezy and paystack.
                </p>
            </div>
            </div>
        </Link> */}
      </CardContent>
    </Card>
    </div>
  )
}