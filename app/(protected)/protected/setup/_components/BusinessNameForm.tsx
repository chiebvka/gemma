'use client'

import React, { useState } from 'react'
import { Tables } from '@/types/supabase';
import { CompanyNameFormSchema } from '@/lib/validation/profile';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { updateBusinessName, updateSetup } from '@/actions/setup/updateProfile';
import { useToast } from '@/components/ui/use-toast';
import { profileConfig } from '@/config/profile';
import { Pencil, PlusCircle } from 'lucide-react';

interface Props  {
    userDetails: Profile
  }
  
type Profile = Tables<'profiles'>;

type BusinessNameFormValues = z.infer<typeof CompanyNameFormSchema>

export default function BusinessNameForm({userDetails}: Props) {
    const router = useRouter();
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false)

    const toggleEdit = () => setIsEditing((current) => !current)

    const defaultValues: Partial<BusinessNameFormValues> = {
        companyName: userDetails?.companyName || "",
    };

    const form = useForm<BusinessNameFormValues>({
        resolver: zodResolver(CompanyNameFormSchema),
        defaultValues,
        mode: "onChange",
    });


    const { isSubmitting, isValid } = form.formState

    async function onSubmit(data:BusinessNameFormValues) {
        try {
            const response = await updateBusinessName({
                id: userDetails.id,
                companyName: data.companyName ?? '',
            
            })    
            if (response) {
                toast({
                    variant: "success",
                    title: "Success",
                    description: (profileConfig.successMessage),
                  })
                  location.reload()
              } else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: (profileConfig.errorMessage),
                  })
              }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: (profileConfig.errorMessage),
              })
        }
    }



  return (
    <Card  className='mt-6 border bg-slate-100 border-black shadow-lg rounded-md'>
        <CardHeader className="font-medium flex flex-row items-center justify-between">
            Busiess Name
            <Button onClick={toggleEdit} variant="ghost">
            {isEditing && (
                    <>Cancel</>
                )} 
                {!isEditing && !userDetails?.companyName && (
                    <span className='text-xs flex'>
                        <PlusCircle className='h-4 w-4 mr-1' />
                        Add Business Name
                    </span>
                )}

                {!isEditing && userDetails?.companyName && (
                    <>
                        <Pencil className='h-4 w-4 mr-2' />
                        Edit Image
                    </>
                )}
            </Button>
        </CardHeader>
        <CardContent>
            {!isEditing && (
                <p className="text-sm  w-full border border-dashed -mt-2 border-black rounded-lg p-2">
                    {userDetails.companyName}
                </p>
            )}
                    {isEditing && (
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-2 -mt-2'
                    >
                        <FormField 
                            control={form.control}
                            name='companyName'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Course Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled={isSubmitting}
                                            placeholder="Your Business Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Your business name for receipts and invoices
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmitting}
                                type='submit'
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </CardContent>
    </Card>
  )
}