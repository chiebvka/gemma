"use client"

import React, { useState } from 'react'
import Image from 'next/image';
import { z } from 'zod';
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import FileUpload from '@/components/FileUpload';
import { Tables } from '@/types/supabase';
import {
  Form,
  FormControl,
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
import { useToast } from '@/components/ui/use-toast';
import { LogoFormSchema, ProfileFormSchema } from '@/lib/validation/profile';
import { profileConfig } from '@/config/profile';
import { updateBusinessLogo } from '@/actions/setup/updateProfile';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';


interface Props  {
  userDetails: Profile
}

type Profile = Tables<'profiles'>;

type BusinessLogoFormValues = z.infer<typeof LogoFormSchema>;




  

export default function ImageForm({userDetails}: Props) {
    const router = useRouter();
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    const toggleEdit = () => setIsEditing((current) => !current)

    const defaultValues: Partial<BusinessLogoFormValues> = {
      logoLink: userDetails?.logoLink || "",
  };

  const form = useForm<BusinessLogoFormValues>({
    resolver: zodResolver(LogoFormSchema),
    defaultValues,
    mode: "onChange",
});

async function onSubmit(data:BusinessLogoFormValues){
    setIsUpdating(true)
    try {
      const response = await updateBusinessLogo({
          id: userDetails.id,
          logoLink: data.logoLink ?? '',
      
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
  
      setIsUpdating(false);    
}
    
  return (
    <Card  className='mt-6 border bg-slate-100 border-black shadow-lg rounded-md'>
       <CardHeader className="font-medium flex flex-row items-center justify-between">
            Busiess Logo
            <Button onClick={toggleEdit} variant="ghost">
            {isEditing && (
                    <>Cancel</>
                )} 
                {!isEditing && !userDetails?.logoLink && (
                    <span className='text-xs flex'>
                        <PlusCircle className='h-4 w-4 mr-1' />
                        Add an Image
                    </span>
                )}

                {!isEditing && userDetails?.logoLink && (
                    <>
                        <Pencil className='h-4 w-4 mr-2' />
                        Edit Image
                    </>
                )}
            </Button>
        </CardHeader>
        <CardContent>
        {!isEditing && (
            !userDetails.logoLink ? (
                <div className='flex items-center justify-center h-60 bg-slate-200 rounded-md'>
                    <ImageIcon className='h-10 w-10 text-slate-500' />
                </div>
            ) : (
                <div className='relative aspect-video border border-dashed border-black rounded-lg mt-2'>
                <Image
                        alt="upload"
                        fill
                        sizes='10'
                        className='object-contain size-48 rounded-md'
                        src={userDetails?.logoLink}
                    />
                </div>
            )
        )}
        {isEditing && (
          <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-2 -mt-2'
            >
                <FormField
                    control={form.control}
                    name="logoLink"
                    render={({ field }) => (
                    <FormItem>
                        {/* <FormLabel>{profileConfig.businessName}</FormLabel> */}
                        <FormControl>
                            <div>
                                <FileUpload 
                                    endpoint='imageUploader'
                                    onChange={(url) => {
                                        if(url) {
                                          onSubmit({logoLink: url });
                                        }
                                        setIsEditing(false)
                                    }}
                                /> 
                                <div className="text-xs text-muted-foreground mt-4">
                                    16:9 aspect ratio recommended
                                </div>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              </form>
            </Form>
        )}
        </CardContent>
    </Card>
  )
}