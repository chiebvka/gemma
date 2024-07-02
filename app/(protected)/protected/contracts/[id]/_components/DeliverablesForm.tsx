"use client"

import React, { useState } from 'react';
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
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { deliverableTitleSchema } from '@/lib/validation/deliverable';
import { PlusCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Tables } from '@/types/supabase';
import { createDeliverable, reorderDeliverable } from '@/actions/deliverables/deliver';
import { profileConfig } from '@/config/profile';
import DeliverableList from './DeliverableList';
import axios from 'axios';

type Deliverables = Tables<'deliverables'>;
type Project = Tables<'projects'>;

type Props = {
    projectData: Project 
    deliverableData: Deliverables[]
    projectId: string;
    
}

type DeliverableTitleValue = z.infer<typeof deliverableTitleSchema>

export default function DeliverablesForm({projectId, projectData, deliverableData}: Props) {
    const router = useRouter();
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false)
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const toggleEdit = () => setIsEditing((current) => !current)

    const form = useForm<DeliverableTitleValue>({
        resolver: zodResolver(deliverableTitleSchema),
        defaultValues: {
            title: ""
        },
        mode: "onChange",
    })

    const { isSubmitting, isValid } = form.formState

    async function onSubmit(data:DeliverableTitleValue) {
       const response = await createDeliverable({
        title: data?.title ?? '',
        project_id: projectId
       })
       console.log(response)
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
    }


    const onReorder = async (updateData: { id: string; position: number}[]) => {
        try {
            setIsUpdating(true)

            // const response = await reorderDeliverable({list: updateData}) 
            await axios.put(`/api/projects/${projectId}/deliverables/reorder`, {
                list: updateData
            })
            toast({
                variant: "success",
                title: "Success",
                description: (profileConfig.successMessage),
                })  
            
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: (profileConfig.errorMessage),
                })
        } finally {
            setIsUpdating(false)
        }

    }

    const onEdit = (id: string) => {
        router.push(`/protected/contracts/${projectId}/deliverables/${id}`)
    }

  return (
    <div className='relative mt-6 border bg-gradient-to-br from-[#f0f0f0] to-[#e0e0e0] shadow-lg rounded-md p-4'>
        <div className="flex items-center">
             <AlertDialog open={isUpdating} onOpenChange={setIsUpdating}>
                <AlertDialogContent className="font-sans">
                    <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">
                        Please wait
                    </AlertDialogTitle>
                    <AlertDialogDescription className="mx-auto text-center">
                        <SpinnerIcon className="h-6 w-6 animate-spin" />
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </div>
        <div className="font-medium flex items-center justify-between">
            Project Deliverables
            <Button onClick={toggleEdit} variant="ghost">
                {isEditing ? (
                    <>Cancel</>
                ): (
                    <>
                        <PlusCircle className='h-4 w-4 mr-2' />
                        Add a Chapter
                    </>
                )}
            </Button>
        </div>
        {isEditing && (
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-8 mt-4'
                >
                    <FormField
                        control={form.control}
                        name='title'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Project Description
                                </FormLabel>
                                <FormControl>
                                    <Input 
                                        disabled={isSubmitting}
                                        placeholder="Your project description"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    The details and short description of the project 
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
                            Save
                        </Button>
                    </div>
                </form>
            </Form>
        )}
        {!isEditing && (
            <div className={cn(
                "text-sm mt-2",
                !deliverableData.length &&  "text-slate-500 italic"
            )}>
                {!deliverableData?.length && "No Deliverables"}
                <DeliverableList 
                    onEdit ={onEdit}
                    onReorder ={onReorder}
                    items={deliverableData || []}
                />
            </div>
        )}
        {!isEditing && (
            <p className='text-xs text-muted-foreground mt-4'>
                Drag and drop to reorder your deliverables
            </p>
        )}
    </div>
  )
}