"use client"

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FinanceFormSchema } from '@/lib/validation/finance';
import { Icons } from '@/components/icons';
import { Loader2 as SpinnerIcon } from "lucide-react";
import Link from 'next/link';
import { ClockIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tables } from '@/types/supabase';
import { z } from 'zod';
import { onboardStripe, removeStripe, stripeSetup } from '@/actions/finances/setup';
import { profileConfig } from '@/config/profile';
import { useToast } from '@/components/ui/use-toast';
import { connected } from 'process';
import { useRouter } from 'next/navigation';
import { financeConfig } from '@/config/finance';


interface Props  {
    userDetails: Profile,
    // stripeAccount: string,
  }
  
type Profile = Tables<'profiles'>;
type FinanceFormValues = z.infer<typeof FinanceFormSchema>

export default function FinanceForm({userDetails}: Props) {

    const router = useRouter();
    const { toast } = useToast();
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [selectedProcessor, setSelectedProcessor] = useState('')
    const [onboardingUrl, setOnboardingUrl] = useState('')

    // const handleProcessorChange = (e: React.FormEvent<HTMLButtonElement>) => {
    //     setSelectedProcessor(e.currentTarget.value)
    // }
    
    const defaultValues:Partial<FinanceFormValues> = {
        id: userDetails?.id || "",
        connectedAccountId: userDetails?.connectedAccountId || ""
    }
    const form = useForm<FinanceFormValues>({
        resolver: zodResolver(FinanceFormSchema),
        defaultValues

    })

    async function connectStripe() {
        const response = await stripeSetup()

        if (!response) {

            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: (financeConfig.stripeConnectError),
              })
        }
        router.refresh()
    }

    async function deleteStripe() {
        setIsUpdating(true)

        const deleted =  await removeStripe()

        if (deleted) {
            toast({
                variant: "success",
                title: "Success",
                description: (profileConfig.successMessage),
              })  
        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: (profileConfig.errorMessage),
              })
          }
      
          setIsUpdating(false);   
          router.refresh() 
    }

    async function stripeOnboard() {
        const accounts = await onboardStripe()
        console.log(accounts)

        // if(!accounts) {
        //     toast({
        //         variant: "destructive",
        //         title: "Uh oh! Something went wrong.",
        //         description: (profileConfig.errorMessage),
        //       })
        // }
    }



  return (
    <div className='w-full'>
            <Tabs defaultValue="stripe" className='space-y-4  rounded-lg'>
                <div className=" flex w-full">
                    <TabsList className="grid grid-cols-4 w-full  gap-4 border-2  h-auto ">
                        <TabsTrigger value="stripe" className='flex flex-col border-2 border-[#6366F1] '>
                            <span className="sr-only">stripe</span>
                            <Icons.stripe className="mb-3 h-6 w-6" />
                            <span className='md:flex hidden'>Stripe</span> 
                        </TabsTrigger>
                        <TabsTrigger value="paypal" className='flex flex-col border-2 border-[#0077B6] '>
                            <span className="sr-only">Complete</span>
                            <Icons.paypal className="mb-3 h-6 w-6" />
                            <span className='md:flex hidden'>Paypal</span> 
                        </TabsTrigger>
                        <TabsTrigger value="lemonsqueezy" className='flex flex-col border-2 border-[#F59E0B] '>
                            <span className="sr-only">lemonsqueezy</span>
                            <Icons.lemon className="mb-3 h-6 w-6" />
                            <span className='md:flex hidden'>Lemon Squeezy</span> 
                        </TabsTrigger>
                        <TabsTrigger value="paystack" className='flex flex-col border-2 border-[#00C1A5] '>
                            <span className="sr-only">paystack</span>
                            <Icons.paystack className="mb-3 h-6 w-6" />
                            <span className='md:flex hidden'>Paystack</span> 
                        </TabsTrigger>
                    </TabsList>
                </div>
                <div className=" w-full">
                    <TabsContent value="stripe" className="space-y-4 flex w-full shadow-2xl md:w-10/12 mx-auto flex-col mt-0 border-0 p-0 ">
                        <Card className="w-full bg-gradient-to-r space-y-4 from-[#6366F1] to-[#8B5CF6] text-white shadow-lg">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Icons.stripe
                                    className="h-6 w-6 filter drop-shadow"
                                    />
                                    <h3 className="text-sm md:text-lg font-medium">Stripe</h3>
                                </div>
                                {userDetails?.stripeConnectLinked === false?
                                    <Badge className="bg-white text-[#6366F1] font-medium" >
                                        Not Connected
                                    </Badge>
                                    :
                                    <Badge className="bg-white text-[#6366F1] font-medium" >
                                        Connected
                                    </Badge>
                                }
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {userDetails?.stripeConnectLinked === false ? 
                                        <p className="text-xs md:text-sm">You haven't connected your Stripe account yet. Connect your account to start accepting payments.</p>
                                        :
                                        <p className="text-xs md:text-sm">Your Stripe account is currently connected and ready to accept payments.</p>
                                    }
                                <div className="flex items-center justify-between">
                                    <Sheet> 
                                        {userDetails?.stripeConnectLinked === false ? 
                                        <SheetTrigger asChild>
                                                    <form onSubmit={form.handleSubmit(connectStripe)}>
                                                        <Button type='submit'  className="bg-white text-[#6366F1] text-xs md:text-sm hover:bg-gray-100" size="sm" variant="outline">
                                                                Connect Stripe
                                                        </Button>
                                                    </form>  
                                            </SheetTrigger>
                                              :
                                            <form onSubmit={form.handleSubmit(deleteStripe)}>
                                                <Button className="bg-white text-[#6366F1] text-xs md:text-sm hover:bg-gray-100" size="sm" variant="outline">
                                                    Disconnect Stripe
                                                </Button>
                                            </form>
                                        }
                                        <SheetContent side={"left"}>
                                            <SheetHeader>
                                                <SheetTitle>Stripe Onboarding</SheetTitle>
                                                <SheetDescription>
                                                    You would be connecting your stripe account to the email address below 
                                                </SheetDescription>
                                            </SheetHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="name" className="text-right">
                                                    Email
                                                    </Label>
                                                    <Input id="name" value={userDetails?.email|| ""} className="col-span-3"    disabled />
                                                </div>
                                            </div>
                                            <SheetFooter>
                                            <SheetClose asChild>

                                                <form onSubmit={form.handleSubmit(stripeOnboard)}>
                                                    <Button >Link to stripe</Button>
                                                </form> 
                                           
                                            </SheetClose>
                                            </SheetFooter>
                                        </SheetContent>
                                    </Sheet>
                               
                                    <div className="flex space-x-2 items-center gap-2">
                                    <ClockIcon className="h-4 w-4 hidden md:flex" />
                                    <span className="text-xs md:text-sm"> Since May 21, 2024</span>
                                    </div>
                                </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="paypal" className="space-y-4 flex w-full  shadow-2xl md:w-10/12 mx-auto flex-col mt-0 border-0 p-0 "> 
                        <Card className="w-full space-y-4  bg-gradient-to-r from-[#0077B6]  to-[#0070BA] text-white shadow-lg">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Icons.paypal
                                    className="h-6 w-6 filter drop-shadow"
                                    />
                                    <h3 className="text-sm md:text-lg font-medium">PayPal</h3>
                                </div>
                                {!userDetails?.connectedAccountId ?
                                    <Badge className="bg-white text-[#0070BA] font-medium">
                                        Not Connected
                                    </Badge>
                                    :
                                    <Badge className="bg-white text-[#0070BA] font-medium">
                                        Connected
                                    </Badge>
                                }
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                {!userDetails?.connectedAccountId ? 
                                <p className="text-xs md:text-sm"> You haven't connected your PayPal account yet. Connect your account to start accepting payments.</p> 
                                :
                                <p className="text-xs md:text-sm"> Your Stripe account is currently connected and ready to accept payments.</p> 

                                }
                                <div className="flex items-center justify-between">
                                {!userDetails?.connectedAccountId ?
                                    <form>
                                        <Button className="bg-white text-[#0070BA] text-xs md:text-sm hover:bg-gray-100" size="sm" variant="outline">
                                            Connect PayPal
                                        </Button>
                                    </form>
                                    : 
                                    <form>
                                    <Button className="bg-white text-[#0070BA] text-xs md:text-sm hover:bg-gray-100" size="sm" variant="outline">
                                        Disconnect PayPal
                                    </Button>
                                    </form>
                                 }
                                    <div className="flex space-x-2 items-center gap-2">
                                    <ClockIcon className="h-4 w-4 hidden md:flex" />
                                    <span className="text-xs md:text-sm">Not connected</span>
                                    </div>
                                </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="lemonsqueezy" className="space-y-4 flex w-full  shadow-2xl md:w-10/12 mx-auto flex-col mt-0 border-0 p-0 "> 
                        <Card className="w-full space-y-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white shadow-lg">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Icons.lemon
                                        className="h-6 w-6 filter drop-shadow"
                                    />
                                    <h3 className="text-sm md:text-lg font-medium">Lemon Squeezy</h3>
                                </div>
                                {!userDetails?.connectedAccountId ?
                                    <Badge className="bg-white text-[#F59E0B] font-medium" >
                                        Not Connected
                                    </Badge>
                                    : 
                                    <Badge className="bg-white text-[#F59E0B] font-medium" >
                                        Connected
                                    </Badge>
                                }
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {!userDetails?.connectedAccountId ? 
                                        <p className="text-xs md:text-sm">You haven't connected your LemonSqueezy account yet. Connect your account to start accepting payments. </p>
                                        :
                                        <p className="text-xs md:text-sm">Your LemonSqueezy account is currently connected and ready to accept payments. </p>
                                    }
                                <div className="flex items-center justify-between">
                                    {!userDetails?.connectedAccountId ? 
                                    <form>           
                                        <Button className="bg-white text-[#F59E0B] text-xs md:text-sm hover:bg-gray-100" size="sm" variant="outline">
                                        Connect LemonSqueezy
                                        </Button>
                                    </form>
                                    : 
                                    <form>           
                                        <Button className="bg-white text-[#F59E0B] text-xs md:text-sm hover:bg-gray-100" size="sm" variant="outline">
                                        Disconnect LemonSqueezy
                                        </Button>
                                    </form>
                                    }
                                    <div className="flex space-x-2 items-center gap-2">
                                    <ClockIcon className="h-4 w-4 hidden md:flex" />
                                    <span className="text-xs md:text-sm">Not connected</span>
                                    </div>
                                </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="paystack" className="space-y-4 flex w-full  shadow-2xl md:w-10/12 mx-auto flex-col mt-0 border-0 p-0 "> 
                        <Card className="w-full space-y-4 bg-gradient-to-r from-[#00C1A5] to-[#00A3A3] text-white shadow-lg">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Icons.paystack
                                        className="h-6 w-6 filter drop-shadow"
                                    />
                                    <h3 className="text-sm md:text-lg font-medium">Paystack</h3>
                                </div>
                                {!userDetails?.connectedAccountId ?
                                <Badge className="bg-white text-[#00C1A5] font-medium" >
                                    Not Connected
                                </Badge> : 
                                <Badge className="bg-white text-[#00C1A5] font-medium" >
                                     Connected
                                </Badge>
                                }
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {!userDetails?.connectedAccountId ? 
                                        <p className="text-xs md:text-sm"> You haven't connected your Paystack account yet. Connect your account to start accepting payments. </p>
                                        :
                                        <p className="text-xs md:text-sm">Your Paystack account is currently connected and ready to accept payments. </p>
                                    }
                                <div className="flex items-center justify-between">
                                    {!userDetails?.connectedAccountId ? 
                                    <form>
                                        <Button className="bg-white text-[#00C1A5] text-xs md:text-sm hover:bg-gray-100" size="sm" variant="outline">
                                            Connect Paystack
                                        </Button>
                                    </form>
                                    : 
                                    <form>
                                        <Button className="bg-white text-[#00C1A5] text-xs md:text-sm hover:bg-gray-100" size="sm" variant="outline">
                                            Disconnect Paystack
                                        </Button>
                                    </form>
                                    }
                                 
                                    <div className="flex space-x-2 items-center gap-2">
                                    <ClockIcon className="h-4 w-4 hidden md:flex" />
                                    
                                    <span className="text-xs md:text-sm">Not connected</span>
                                    </div>
                                </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </div>
            </Tabs>
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