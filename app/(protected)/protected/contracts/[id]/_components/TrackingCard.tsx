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
import { projectNotificationSchema } from '@/lib/validation/project';
import { projectNotificationComplete } from '@/actions/projects/project';
import { projectConfig } from '@/config/project';

type Props = {
    initialData: {
        isDraft: boolean,
        signature: boolean
    };
    id: string
}

type ProjectStatusValues= z.infer<typeof projectNotificationSchema>

export default function TrackingCard({initialData, id}: Props) {
    const router = useRouter();
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false)
    const toggleEdit = () => setIsEditing((current) => !current)


    const defaultValues: Partial<ProjectStatusValues> = {
        isDraft: initialData?.isDraft,
        signature: initialData?.signature,   
        
    };


    const form = useForm<ProjectStatusValues>({
        resolver: zodResolver(projectNotificationSchema),
        defaultValues,
        mode: "onChange",
    });

    const { isSubmitting, isValid } = form.formState

    async function onSubmit(data:ProjectStatusValues){
        try {
            const response = await projectNotificationComplete({
                isDraft: data?.isDraft,
                signature: data?.signature,
                id: id
            })

            toast({
                variant: "success",
                title: "Success",
                description: (projectConfig.projectStatusSuccess),
            })
            location.reload()  

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: (projectConfig.projectStatusError),
                })
        }
    }


  return (
    <Card className='mt-6 border bg-gradient-to-br from-[#f0f0f0] to-[#e0e0e0] shadow-lg rounded-md border-black'>
        <CardHeader className="font-medium flex flex-row items-center justify-between">
            Project Notifications
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-4'
                >
                    {/* <FormField 
                        control={form.control}
                        name='isDraft'
                        render={({ field }) => (
                            <FormItem className=' w-full flex flex-row items-center justify-between  bg-white/70 hover:border-sky-200 -mt-2  rounded-lg p-4'>
                                <div className="space-y-0.5">
                                    <FormLabel className="text-sm">
                                        Initiate Project Invoice
                                    </FormLabel>
                                    <FormDescription className='text-black text-xs'>
                                        Turn on the switch to create and send project invoice to intended client
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />  */}
                    <FormField 
                        control={form.control}
                        name='signature'
                        render={({ field }) => (
                            <FormItem className=' w-full flex flex-row items-center justify-between  bg-white/70 hover:border-sky-200 -mt-2  rounded-lg p-4'>
                                <div className="space-y-0.5">
                                    <FormLabel className="text-sm">
                                        Initiate Project Agreement
                                    </FormLabel>
                                    <FormDescription className='text-black text-xs'>
                                        Turn on the switch to create and send project agreement details to intended client
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> 
                    <div className="flex items-center gap-x-2">
                        <Button
                            // disabled={!isValid || isSubmitting}
                            type='submit'
                        >
                            Update Notifications 
                        </Button>
                    </div>
                </form>
            </Form>
        </CardContent>
    </Card>
  )
}