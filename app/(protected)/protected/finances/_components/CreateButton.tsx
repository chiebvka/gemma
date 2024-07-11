"use client"
import { stripeCreate } from '@/actions/finances/setup'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { financeConfig } from '@/config/finance'
import { FinanceFormSchema } from '@/lib/validation/finance'
import { Tables } from '@/types/supabase'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
  import { Loader2 as SpinnerIcon } from "lucide-react";
import { z } from 'zod'
import { profileConfig } from '@/config/profile'

interface Props  {
    userDetails: Profile,
    // stripeAccount: string,
  }
  
type Profile = Tables<'profiles'>;
type FinanceFormValues = z.infer<typeof FinanceFormSchema>

export default function CreateButton({userDetails}: Props) {


    const router = useRouter();
    const { toast } = useToast();
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const defaultValues:Partial<FinanceFormValues> = {
        id: userDetails?.id || "",
        connectedAccountId: userDetails?.connectedAccountId || ""
    }
    const form = useForm<FinanceFormValues>({
        resolver: zodResolver(FinanceFormSchema),
        defaultValues

    })


    async function createStripe() {
        setIsUpdating(true)
        const response = await stripeCreate()
        if (!response) {

            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: (financeConfig.stripeConnectError),
              })
        }
        setIsUpdating(false)
        router.push("/protected/finances/connect")
    }

  return (
    <div className='w-full'>
        <div className='flex justify-between'>
        <div className="flex flex-col space-y-4 ">
        {!userDetails?.connectedAccountId ? 
            <h1 className='lg:text-3xl md:text-2xl text-lg  font-extrabold  '>Link Payment</h1>
            :
            <h1 className='lg:text-3xl md:text-2xl text-lg  font-extrabold'>Processor Connected</h1>
        }
        </div>

            {!userDetails?.connectedAccountId ? 
                <form onSubmit={form.handleSubmit(createStripe)}>
                    <Button >
                    Connect Processor
                        {/* <Link href={`/protected/finances/connect`}>Connect Processor</Link> */}
                    </Button>
                </form>
            :
                <Button>

                    <Link href={`/protected/finances/connect`}>Manage Processor</Link>
                </Button>
            }
        </div>
        {!userDetails?.connectedAccountId ? 
            <p className='text-sm my-3 md:text-base'>Seems like you haven't connected your payment method yet </p>
            :
            <p className='text-sm my-3 md:text-base'>Looks like you're all setup with your processor </p>
        }
        <Separator className='my-5' />
        {!userDetails?.connectedAccountId ?
        <div className="h-96 border-2 border-dashed border-palette">
            <img src="/dashempty.png" alt="" className="object-contain w-full h-full" />
        </div>
         : <></>
        }
        <AlertDialog open={isUpdating} onOpenChange={setIsUpdating}>
                <AlertDialogContent className="font-sans">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">
                    {profileConfig.pleaseWait}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="mx-auto text-center">
                    <SpinnerIcon className="h-6 w-6 animate-spin" />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
    </div>
  )
}