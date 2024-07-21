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
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { Loader2 as SpinnerIcon } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Tables } from '@/types/supabase';
import { CompanyFormSchema, ProfileFormSchema } from '@/lib/validation/profile';
import { updateProfileSetup } from '@/actions/setup/updateProfile';
import { profileConfig } from '@/config/profile';
import FileUpload from '@/components/FileUpload';
import { z } from 'zod';


type Profile = Tables<'profiles'>;

type ProfileFormValues = z.infer<typeof CompanyFormSchema>;


interface Props  {
    userDetails: Profile
}

export default function ProfileSetupForm({userDetails}: Props) {
    const router = useRouter();
    const { toast } = useToast();

    const [isEditing, setIsEditing] = useState(false)
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const toggleEdit = () => setIsEditing((current) => !current)

    // This can come from your database or API.
    const defaultValues: Partial<ProfileFormValues> = {
        // email: userDetails?.email || "",
        companyEmail: userDetails?.companyEmail || "",
        companyAddress: userDetails?.companyAddress || "",
        companyMobile: userDetails?.companyMobile || "",
    
    };


    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(CompanyFormSchema),
        defaultValues,
        mode: "onChange",
    });

    const { isSubmitting, isValid } = form.formState

    async function onSubmit(data:ProfileFormValues){
        setIsUpdating(true)
        try {            
            const response = await updateProfileSetup({
                id: userDetails.id,
                companyEmail: data.companyEmail ?? '',
                companyMobile: data.companyMobile ?? '',
                companyAddress: data.companyAddress ?? '',
            })    
            if (response) {
                toast({
                    variant: "success",
                    title: "Success",
                    description: (profileConfig.successMessage),
                  })
            }
        } catch (error) {           
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: (profileConfig.errorMessage),
              })
        }    
          setIsUpdating(false);   
          router.refresh() 
    }


  return (

    <Card className='mt-6 border bg-slate-100 border-black shadow-lg rounded-md'>
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8 mt-4'
            >
                <CardHeader>
                    Business Contact
                    <CardDescription>Your business details which appear on your invoices, receipts annd contracts</CardDescription>
                </CardHeader>
                <CardContent className='space-y-2 w-full'>
                        <div className="flex flex-col  space-y-3">  
                            <FormField
                                control={form.control}
                                name="companyEmail"
                                
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{profileConfig.businessEmail}</FormLabel>
                                    <FormControl>
                                    <Input
                                        placeholder={profileConfig.businessEmailPlaceholder}
                                        {...field}
                                        className="max-w-md "
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="companyMobile"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{profileConfig.businessMobile}</FormLabel>
                                    <FormControl>
                                    <Input
                                        placeholder={profileConfig.businessMobilePlaceholder}
                                        {...field}
                                        type='number'
                                        className="max-w-md"
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="companyAddress"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{profileConfig.businessAddress}</FormLabel>
                                    <FormControl>
                                    <Input
                                        placeholder={profileConfig.businessAddressPlaceholder}
                                        {...field}
                                        className="max-w-md"
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />   
                                        
                        </div>

    

                </CardContent>
                <CardFooter className=" flex justify-between px-6 py-4">
                    <Button 
                        type="submit" 
                        // disabled={!isValid || isSubmitting}
                    >
                        {profileConfig.update}
                    </Button>    
                </CardFooter>
            </form>
        </Form>

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
    </Card>
  )
}