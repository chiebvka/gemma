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
import { deliverableDecriptionSchema } from '@/lib/validation/deliverable';
import { updatdeDeliverableDescription } from '@/actions/deliverables/deliver';
import { deliverableConfig } from '@/config/deliverables';
import { Textarea } from '@/components/ui/textarea';

type Props = {
    initialData: {
        description: string
    };
    id: string;
    deliverableId: string
}

type DeliverableDescriptionValue = z.infer<typeof deliverableDecriptionSchema>

export default function DeliverableDescription({initialData, id, deliverableId}: Props) {
    const router = useRouter();
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false)
    const toggleEdit = () => setIsEditing((current) => !current)

    const defaultValues: Partial<DeliverableDescriptionValue> = {
        description: initialData?.description || "",
    };

    const form = useForm<DeliverableDescriptionValue>({
        resolver: zodResolver(deliverableDecriptionSchema),
        defaultValues,
        mode: "onChange",
    });

    const { isSubmitting, isValid } = form.formState

    async function onSubmit(data: DeliverableDescriptionValue){
        const response = await updatdeDeliverableDescription({
            description: data?.description || "",
            id: deliverableId,
            project_id: id
        })
        console.log(response)

        if(response) {
            toast({
                variant: "success",
                title: "Success",
                description: (deliverableConfig.deliverableDescriptionUpdateSuccess),
            })
            location.reload()  
        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: (deliverableConfig.deliverableDescriptionUpdateError),
                })
            }
    }

  return (
    <Card className='mt-6 border bg-gradient-to-br from-[#f0f0f0] to-[#e0e0e0] shadow-lg rounded-md border-black'>
            <CardHeader className="font-medium flex flex-row items-center justify-between">
            Deliverable Description
            <Button onClick={toggleEdit} variant="ghost">
            {isEditing && (
                <>Cancel</>
            )} 
            {!isEditing && !initialData?.description && (
                <span className='text-xs flex'>
                    <PlusCircle className='h-4 w-4 mr-1' />
                    Add Deliverable Description
                </span>
            )}
            {!isEditing && initialData?.description && (
                <>
                    <Pencil className='h-4 w-4 mr-2' />
                    Edit Deliverable Description
                </>
            )}
            </Button>
        </CardHeader>
        <CardContent>
            {!isEditing && (
                <Textarea 
                rows={10} 
                disabled 
                className="text-sm  w-full border border-black/60 font-medium bg-white/70 hover:border-sky-200  -mt-2 rounded-lg p-4" 
                defaultValue={initialData.description}
                />
            )}
            {isEditing && (
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-2 -mt-2'
                    >
                        <FormField 
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {/* Deliverable Title */}
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={10} 
                                            disabled={isSubmitting}
                                            placeholder="Your Deliverable Description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Your deliverable description
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
                                Update Description
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </CardContent>
    </Card>
  )
}