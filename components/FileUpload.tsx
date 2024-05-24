"use client"

import { OurFileRouter, ourFileRouter } from '@/app/api/uploadthing/core'


import React from 'react';
import { useRouter } from 'next/navigation';

import { useToast } from './ui/use-toast';
import { UploadDropzone } from '@/utils/uploadthing';


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
        onClientUploadComplete={(res: { url: string | undefined; }[]) => {
            onChange(res?.[0].url)
            toast({
              variant: "success",
              title: "Success 🎉",
              description: 'Invoice Logo updated successfully',
            })
            router.refresh() 
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