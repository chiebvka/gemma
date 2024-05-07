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
            <Tabs defaultValue="stripe" className='border-2 border-red-500 space-y-4  rounded-lg'>
                <div className="border-black border-2 flex w-full">
                    <TabsList className="grid grid-cols-3 w-full  gap-30 border-2 bg-white h-auto border-green-300">
                        <TabsTrigger value="stripe" className='flex flex-col border-2 border-yellow-500 '>
                            <span className="sr-only">Complete</span>
                            <Icons.stripe className="mb-3 h-6 w-6" />
                            Stripe
                        </TabsTrigger>
                        <TabsTrigger value="paypal" className='flex flex-col border-2 border-yellow-500 '>
                            <span className="sr-only">Complete</span>
                            <Icons.paypal className="mb-3 h-6 w-6" />
                            Paypal
                        </TabsTrigger>
                        <TabsTrigger value="lemonsqueezy" className='flex flex-col border-2 border-yellow-500 '>
                            <span className="sr-only">Complete</span>
                            <Icons.lemon className="mb-3 h-6 w-6" />
                            Lemon Squezy
                        </TabsTrigger>
                    </TabsList>
                </div>
                <div className="border-black border-2  w-full">
                    <TabsContent value="stripe" className="space-y-4 flex w-10/12 mx-auto flex-col mt-0 border-0 p-0 ">
                        <p className='w-full '>Connect your <span className="text-violet-600">Stripe</span>  account and receive paymengts directly from your invoice into your account</p>
                        <Button  className="w-full  bg-violet-600" >
                            <Link href={onboardingUrl}>Connect </Link> 
                        </Button>
                    </TabsContent>
                    <TabsContent value="paypal" className="space-y-4 flex w-10/12 mx-auto flex-col mt-0 border-0 p-0 "> 
                    <p className='w-full '>Connect your <span className='text-[#0079C1]'>Paypal</span> account and receive paymengts directly from your invoice into your account</p>
                        <Button  className="w-full bg-[#0079C1]" >
                            <Link href='/'>Connect </Link> 
                        </Button>
                    </TabsContent>
                    <TabsContent value="lemonsqueezy" className="space-y-4 flex w-10/12 mx-auto flex-col mt-0 border-0 p-0 "> 
                    <p className='w-full '>Connect your <span className='text-[#FFCE5C]'>Lemonsqueezy</span> account and receive paymengts directly from your invoice into your account</p>
                        <Button  className="w-full bg-[#FFCE5C] text-black" >
                            <Link href={onboardingUrl}>Connect </Link> 
                        </Button>
                    </TabsContent>
                </div>
            </Tabs>
    </div>
  )
}