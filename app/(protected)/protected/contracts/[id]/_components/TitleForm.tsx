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
import { projectTitleSchema } from '@/lib/validation/project';
import { updateProjectTitle } from '@/actions/projects/project';

type Props = {
    initialData: {
        name: string
    };
    id: string
}
type ProjectNameFormValues = z.infer<typeof projectTitleSchema>

export default function TitleForm({initialData, id}: Props) {
    const router = useRouter();
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false)
    const toggleEdit = () => setIsEditing((current) => !current)

    const defaultValues: Partial<ProjectNameFormValues> = {
        name: initialData?.name || "",
    };

    const form = useForm<ProjectNameFormValues>({
        resolver: zodResolver(projectTitleSchema),
        defaultValues,
        mode: "onChange",
    });


    const { isSubmitting, isValid } = form.formState
    async function onSubmit(data:ProjectNameFormValues) {
        const response = await updateProjectTitle({
            name: data?.name ?? '',
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
    <Card className='mt-6 border bg-gradient-to-br from-[#f0f0f0] to-[#e0e0e0] shadow-lg rounded-md border-black'>
        <CardHeader className="font-medium flex flex-row items-center justify-between">
            Project Name
            <Button onClick={toggleEdit} variant="ghost">
            {isEditing && (
                    <>Cancel</>
                )} 
                {!isEditing && !initialData?.name && (
                    <span className='text-xs flex'>
                        <PlusCircle className='h-4 w-4 mr-1' />
                        Add Business Name
                    </span>
                )}

                {!isEditing && initialData?.name && (
                    <>
                        <Pencil className='h-4 w-4 mr-2' />
                        Edit Project Name
                    </>
                )}
            </Button>
        </CardHeader>
        <CardContent>
            {!isEditing && (
                <p className="text-sm  w-full border  bg-white/70 hover:border-sky-200 -mt-2  rounded-lg p-4">
                    {initialData.name}
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
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Course Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled={isSubmitting}
                                            placeholder="Your Business Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Your business name for receipts and invoices
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