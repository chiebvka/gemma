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
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"; 
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Pencil, PlusCircle, Loader2 as SpinnerIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useToast } from "@/components/ui/use-toast";
import { deliverableTitleSchema } from '@/lib/validation/deliverable';
import { updatdeDeliverableTitle } from '@/actions/deliverables/deliver';
import { deliverableConfig } from '@/config/deliverables';






type Props = {
    initialData: {
        title: string
    };
    id: string;
    deliverableId: string
}

type DeliverableTitleValue = z.infer<typeof deliverableTitleSchema>

export default function DeliverableTitle({initialData, id, deliverableId}: Props) {
    const router = useRouter();
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false)
    const toggleEdit = () => setIsEditing((current) => !current)

    const defaultValues: Partial<DeliverableTitleValue> = {
        title: initialData?.title || "",
    };

    const form = useForm<DeliverableTitleValue>({
        resolver: zodResolver(deliverableTitleSchema),
        defaultValues,
        mode: "onChange",
    });

    const { isSubmitting, isValid } = form.formState

    async function onSubmit(data:DeliverableTitleValue){
        const response = await updatdeDeliverableTitle({
            title: data?.title || "",
            id: deliverableId,
            project_id: id
        })

        console.log(response)

        if(response) {
            toast({
                variant: "success",
                title: "Success",
                description: (deliverableConfig.deliverableTitleUpdateSuccess),
            })
            location.reload()  
        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: (deliverableConfig.deliverableTitleUpdateError),
                })
            }
        }
    

  return (
    <Card className='mt-6 border bg-gradient-to-br from-[#f0f0f0] to-[#e0e0e0] shadow-lg rounded-md border-black'>
        <CardHeader className="font-medium flex flex-row items-center justify-between">
            Deliverable Title
            <Button onClick={toggleEdit} variant="ghost">
            {isEditing && (
                <>Cancel</>
            )} 
            {!isEditing && !initialData?.title && (
                <span className='text-xs flex'>
                    <PlusCircle className='h-4 w-4 mr-1' />
                    Add Deliverable Title
                </span>
            )}
            {!isEditing && initialData?.title && (
                <>
                    <Pencil className='h-4 w-4 mr-2' />
                    Edit Deliverable Title
                </>
            )}
            </Button>
        </CardHeader>
        <CardContent>
            {!isEditing && (
                <p className="text-sm  w-full border border-black/60 bg-white/70 hover:border-sky-200 -mt-2  rounded-lg p-4">
                    {initialData?.title}
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
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {/* Deliverable Title */}
                                    </FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled={isSubmitting}
                                            placeholder="Your Deliverable Title"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Your deliverable title
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
                                Update Title
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </CardContent>
    </Card>
  )
}