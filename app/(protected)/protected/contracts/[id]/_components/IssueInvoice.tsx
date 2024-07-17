"use client"
import React, { useState } from 'react';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
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
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { projectInvoiceStatusSchema } from '@/lib/validation/project';
import { createProjectInvoice, projectInvoiceStatus } from '@/actions/projects/project';
import { projectConfig } from '@/config/project';
import Link from 'next/link';

type Props = {
    initialData: {
        id: string,
        issueInvoice: boolean,
        invoice_id: string
    };
    id: string
}

type ProjectInvoiceValue= z.infer<typeof projectInvoiceStatusSchema>

export default function IssueInvoice({initialData, id}: Props) {
    const router = useRouter();
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false)
    const toggleEdit = () => setIsEditing((current) => !current)


    const defaultValues: Partial<ProjectInvoiceValue> = {
        issueInvoice: initialData?.issueInvoice,
 
        
    };


    const form = useForm<ProjectInvoiceValue>({
        resolver: zodResolver(projectInvoiceStatusSchema),
        defaultValues,
        mode: "onChange",
    });

    const { isSubmitting, isValid } = form.formState

    async function onSubmit(data:ProjectInvoiceValue) {
        try {
            const response = await projectInvoiceStatus({
                issueInvoice: data?.issueInvoice,
                id: id
            })
                toast({
                    variant: "success",
                    title: "Success",
                    description: (projectConfig.projectInvoiceSuccess),
                })
   
            location.reload()  
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: (projectConfig.projectInvoiceError),
                })
        }

    }


  return (
    <Card className='mt-6 border bg-gradient-to-br from-[#f0f0f0] to-[#e0e0e0] shadow-lg rounded-md border-black'>
        <CardHeader className="font-medium flex flex-row items-center justify-between">
            Project Invoice
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-4'
                >
                    <FormField
                        control={form.control}
                        name='issueInvoice'
                        render={({ field }) => (
                            <FormItem className=' w-full flex flex-row items-center justify-between  bg-white/70 hover:border-sky-200 -mt-2  rounded-lg p-4'>
                                <div className="space-y-0.5">
                                    <FormLabel className="text-sm">
                                        Initiate Project Invoice
                                    </FormLabel>
                                    <FormDescription className='text-black text-xs'>
                                        Turn on the switch to initiate an invoice for this project
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    {initialData?.issueInvoice ?   
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            disabled
                                        /> :   
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        /> 
                                    }
                                 
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} 
                    />
                    <div className="flex items-center gap-x-2">
                        {!initialData?.issueInvoice ? 
                           <Button
                           // disabled={!isValid || isSubmitting}
                           type='submit'
                       >
                           Issue Invoice
                       </Button>
                         : 
                         <Button asChild>
                         <Link href={`/protected/invoices/${initialData?.invoice_id}`}>
                             View Invoice
                         </Link>
                     </Button> 
                        }
                     
                        {/* {initialData?.issueInvoice ? 
                        <Button asChild>
                            <Link href={`/protected/invoices/${initialData?.invoice_id}`}>
                                View Invoice
                            </Link>
                        </Button> : ""} */}
                       
                    </div>
                </form>
            </Form>
        </CardContent>
    </Card>
  )
}