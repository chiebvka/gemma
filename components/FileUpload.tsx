"use client"

import { OurFileRouter, ourFileRouter } from '@/app/api/uploadthing/core'


import React from 'react';
import { useRouter, redirect } from 'next/navigation';

import { useToast } from './ui/use-toast';
import { UploadDropzone } from '@/utils/uploadthing';
import { cn } from '@/lib/utils';


type Props = {}

interface FileUploadprops {
    onChange:(url?: string) => void;
    endpoint: keyof typeof ourFileRouter;
}

export default function FileUpload({ onChange, endpoint }: FileUploadprops) {
  const router = useRouter();
    const { toast } = useToast();
  return (
    <UploadDropzone
        endpoint={endpoint}
        className='w-full aspect-video cursor-pointer flex flex-col items-center size-48 relative justify-center border-black ut-label:text-xs'
        onClientUploadComplete={(res: { url: string | undefined; }[]) => {
            onChange(res?.[0].url)
            toast({
              variant: "success",
              title: "Success 🎉",
              description: 'Invoice Logo updated successfully',
            })
        }}
        onUploadError={(error: Error) => {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: (error?.message),
              })
        }}
    />
  )
}