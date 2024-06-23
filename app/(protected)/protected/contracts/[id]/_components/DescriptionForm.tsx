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
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Pencil, PlusCircle } from 'lucide-react';
import { profileConfig } from '@/config/profile';
import { Input } from '@/components/ui/input';
import { projectDescriptionSchema } from '@/lib/validation/project';
import { updateProjectDescription } from '@/actions/projects/project';
import { Textarea } from '@/components/ui/textarea';

type Props = {
    initialData: {
        description: string
    };
    id: string
}

type ProjectDescriptionFormValues = z.infer<typeof projectDescriptionSchema>

export default function DescriptionForm({initialData, id}: Props) {
    const router = useRouter();
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false)
    const toggleEdit = () => setIsEditing((current) => !current)

    const defaultValues: Partial<ProjectDescriptionFormValues> = {
        description: initialData?.description || "",
    };

    const form = useForm<ProjectDescriptionFormValues>({
        resolver: zodResolver(projectDescriptionSchema),
        defaultValues,
        mode: "onChange",
    });

    const { isSubmitting, isValid } = form.formState
    async function onSubmit(data:ProjectDescriptionFormValues) {
        const response = await updateProjectDescription({
            description: data?.description ?? '',
            id: id
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

  return (
    <Card className='mt-6 border bg-slate-100 border-black shadow-lg rounded-md'>
        <CardHeader className="font-medium flex flex-row items-center justify-between">
            Project Description
            <Button onClick={toggleEdit} variant="ghost">
            {isEditing && (
                    <>Cancel</>
                )} 
                {!isEditing && !initialData?.description && (
                    <span className='text-xs flex'>
                        <PlusCircle className='h-4 w-4 mr-1' />
                        Add Project Details
                    </span>
                )}

                {!isEditing && initialData?.description && (
                    <>
                        <Pencil className='h-4 w-4 mr-2' />
                        Edit Project Description
                    </>
                )}
            </Button>
        </CardHeader>
        <CardContent>
            {!isEditing && (
                <Textarea 
                    rows={10} 
                    disabled 
                    className="text-sm  w-full border border-dashed -mt-2  border-black rounded-lg p-2" 
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
                                        Project Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea 
                                            disabled={isSubmitting}
                                            rows={10}
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
        </CardContent>
    </Card>
  )
}