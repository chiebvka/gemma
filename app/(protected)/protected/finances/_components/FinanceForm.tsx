"use client"

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FinanceFormSchema } from '@/lib/validation/finance';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import { ClockIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type Props = {}
type FinanceFormValues = z.infer<typeof FinanceFormSchema>

export default function FinanceForm({}: Props) {


    const [selectedProcessor, setSelectedProcessor] = useState('')
    const [onboardingUrl, setOnboardingUrl] = useState('')

    const handleProcessorChange = (e: React.FormEvent<HTMLButtonElement>) => {
        setSelectedProcessor(e.currentTarget.value)
    }
    
    const defaultValues:Partial<FinanceFormValues> = {
        isActive: false
    }
    const form = useForm<FinanceFormValues>({
        resolver: zodResolver(FinanceFormSchema),
        defaultValues

    })


    const handleonboardingurl = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if(selectedProcessor === "paypal"){
            setOnboardingUrl('https://www.paypal.com')
        } else if (selectedProcessor === 'stripe') {
            setOnboardingUrl('https://www.stripe.com')
        }
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
                                <Badge className="bg-white text-[#6366F1] font-medium" >
                                    Connected
                                </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                <p className="text-xs md:text-sm">Your Stripe account is currently connected and ready to accept payments.</p>
                                <div className="flex items-center justify-between">
                                    <Button className="bg-white text-[#6366F1] text-xs md:text-sm hover:bg-gray-100" size="sm" variant="outline">
                                    Change Processor
                                    </Button>
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
                                <Badge className="bg-white text-[#0070BA] font-medium">
                                    Not Connected
                                </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                <p className="text-xs md:text-sm">
                                    You haven't connected your PayPal account yet. Connect your account to start accepting payments.
                                </p>
                                <div className="flex items-center justify-between">
                                    <Button className="bg-white text-[#0070BA] text-xs md:text-sm hover:bg-gray-100" size="sm" variant="outline">
                                    Connect PayPal
                                    </Button>
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
                                <Badge className="bg-white text-[#F59E0B] font-medium" >
                                    Not Connected
                                </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                <p className="text-xs md:text-sm">
                                    You haven't connected your Lemon Squeezy account yet. Connect your account to start accepting payments.
                                </p>
                                <div className="flex items-center justify-between">
                                    <Button className="bg-white text-[#F59E0B] text-xs md:text-sm hover:bg-gray-100" size="sm" variant="outline">
                                    Connect LemonSqueezy
                                    </Button>
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
                                <Badge className="bg-white text-[#00C1A5] font-medium" >
                                    Not Connected
                                </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                <p className="text-xs md:text-sm">
                                    You haven't connected your Paystack account yet. Connect your account to start accepting payments.
                                </p>
                                <div className="flex items-center justify-between">
                                    <Button className="bg-white text-[#00C1A5] text-xs md:text-sm hover:bg-gray-100" size="sm" variant="outline">
                                    Connect Paystack
                                    </Button>
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
    </div>
  )
}