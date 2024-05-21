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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Tables } from '@/types/supabase';
import { ProfileFormSchema } from '@/lib/validation/profile';
import { updateSetup } from '@/actions/setup/updateProfile';
import { profileConfig } from '@/config/profile';

type Profile = Tables<'profiles'>;

type ProfileFormValues = z.infer<typeof ProfileFormSchema>;


interface Props  {
    userDetails: Profile
}

export default function ProfileSetupForm({userDetails}: Props) {
    const router = useRouter();
    const { toast } = useToast();

    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    // This can come from your database or API.
    const defaultValues: Partial<ProfileFormValues> = {
        email: userDetails?.email || "",
        companyName: userDetails?.companyName || "",
        companyEmail: userDetails?.companyEmail || "",
        companyAddress: userDetails?.companyAddress || "",
        companyMobile: userDetails?.companyMobile || "",
    
    };

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(ProfileFormSchema),
        defaultValues,
        mode: "onChange",
    });

    async function onSubmit(data:ProfileFormValues){
        setIsUpdating(true)
        const response = await updateSetup({
            id: userDetails.id,
            companyName: data.companyName ?? '',
            companyEmail: data.companyEmail ?? '',
            companyMobile: data.companyMobile ?? '',
            companyAddress: data.companyAddress ?? '',
            logoLink: data.logoLink ?? '',
        })    
        if (response) {
            toast({
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
    }


  return (

    <div className='space-y-3 border-2 border-black rounded-lg'>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card x-chunk="dashboard-04-chunk-1" >
                    <CardHeader>
                        <CardTitle>{profileConfig.primaryTitle}</CardTitle>
                        <CardDescription>{profileConfig.primarySubTitle}</CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-3'>
                        <Input disabled value={userDetails?.email || ''} className="max-w-md" placeholder={userDetails?.email || ''} />
                        <FormField
                            control={form.control}
                            name="companyName"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>{profileConfig.businessName}</FormLabel>
                                <FormControl>
                                <Input
                                    placeholder={profileConfig.businessNamePlaceholder}
                                    {...field}
                                    className="max-w-md"
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
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
                                    className="max-w-md"
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
                    </CardContent>
                    <CardFooter className="border-t-2 border-t-black flex justify-between px-6 py-4">
                    {/* <Button>  </Button>       */}
                    <Button type="submit" disabled={isUpdating}>
                        {profileConfig.update}
                    </Button>
                    </CardFooter>

                </Card>
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
    </div>
  )
}