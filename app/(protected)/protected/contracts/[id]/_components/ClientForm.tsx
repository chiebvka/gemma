"use client"

import React, { useState } from 'react'
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
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"; 
import { Loader2 as SpinnerIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { clientSchema } from '@/lib/validation/client';
import { clientCreate } from '@/actions/clients/client';
import { clientConfig } from '@/config/client';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
type Props = {}

type ClientValues = z.infer<typeof clientSchema>;

export default function ClientForm({}: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const form = useForm<ClientValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
        name: "",
        email: "",
        address: "",
        mobile: ""
    },
    mode: "onChange",
})


async function onSubmit(data:ClientValues){
  setIsUpdating(true)

  const response = await clientCreate({
    name: data?.name,
    email: data?.email,
    address: data?.address,
    mobile: data?.mobile
    
  })
  setIsUpdating(false)
  if (response) {
    toast({
        variant: "success",
        title: "Success",
        description: clientConfig.createSuccessMessage,
    });
    location.reload() 
} else {
    toast({
        variant: "destructive",
        title: "Unexpected error",
        description: clientConfig.createErrorMessage,
    });
}
}


  return (
    <>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 mt-8'
        >
          <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>
                      Client Name
                  </FormLabel>
                  <FormControl>
                      <Input 
                          disabled={isUpdating}
                          placeholder="Client's Name"
                          {...field}
                      />
                  </FormControl>
                  <FormMessage />
              </FormItem>
              )}
          />
          <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>
                      Client Email
                  </FormLabel>
                  <FormControl>
                      <Input 
                          disabled={isUpdating}
                          placeholder="client@client.com"
                          {...field}
                      />
                  </FormControl>
                  <FormMessage />
              </FormItem>
              )}
          />
          <FormField
              control={form.control}
              name='mobile'
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>
                      Client Mobile
                  </FormLabel>
                  <FormControl>
                      <Input 
                          disabled={isUpdating}
                          placeholder="+123456789"
                          {...field}
                      />
                  </FormControl>
                  <FormMessage />
              </FormItem>
              )}
          />
          <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>
                      Client Address
                  </FormLabel>
                  <FormControl>
                      <Input 
                          disabled={isUpdating}
                          placeholder="Client's Address"
                          {...field}
                      />
                  </FormControl>
                  <FormMessage />
              </FormItem>
              )}
          />
                <div className="flex items-center gap-x-2">
                          <Link href="/protected/contracts">
                              <Button 
                                  type='button'
                                  variant="ghost"
                              >
                                  Cancel</Button>
                          </Link>
                          <Button 
                              type='submit'
                              disabled={isUpdating}
                          >
                              Create Client
                          </Button>
                      </div>
        </form>
      </Form>
      <AlertDialog open={isUpdating} onOpenChange={setIsUpdating}>
        <AlertDialogContent className="font-sans">
            <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
                {clientConfig.pleaseWait}
            </AlertDialogTitle>
            <AlertDialogDescription className="mx-auto text-center">
                <SpinnerIcon className="h-6 w-6 animate-spin" />
            </AlertDialogDescription>
            </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}