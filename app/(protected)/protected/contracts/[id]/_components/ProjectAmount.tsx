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
import { Link, Pencil, PlusCircle } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { projectAmountSchema } from '@/lib/validation/project';
import { updateProjectAmount } from '@/actions/projects/project';
import { projectConfig } from '@/config/project';

type Props = {
    initialData: {
        currency: string,
        amount: number
    };
    id: string
}

type ProjectAmountValues = z.infer<typeof projectAmountSchema>

export default function ProjectAmount({initialData, id}: Props) {
    const router = useRouter();
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false)
    const toggleEdit = () => setIsEditing((current) => !current)

    const defaultValues: Partial<ProjectAmountValues> = {
        currency: initialData?.currency || "",
        amount: initialData?.amount
    };

    const form = useForm<ProjectAmountValues>({
        resolver: zodResolver(projectAmountSchema),
        defaultValues,
        mode: "onChange",
    });


    const { isSubmitting, isValid } = form.formState

    async function onSubmit(data:ProjectAmountValues){
        try {
            const response = await updateProjectAmount({
                currency: data?.currency ?? "",
                amount:  parseFloat(data.amount as unknown as string),
                id: id
            })

            toast({
                variant: "success",
                title: "Success",
                description: (projectConfig.projectAmountSuccess),
                })  

                location.reload() 
    
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: (projectConfig.projectAmountError),
                })
        }

    }

    
  return (
    <Card className='mt-6 border bg-gradient-to-br from-[#f0f0f0] to-[#e0e0e0] shadow-lg rounded-md border-black'>
        <CardHeader  className="font-medium flex flex-row items-center justify-between">
            Project Amount
            <Button onClick={toggleEdit} variant="ghost">
            {isEditing && (
                    <>Cancel</>
                )} 
                {!isEditing && !initialData?.amount && (
                    <span className='text-xs flex'>
                        <PlusCircle className='h-4 w-4 mr-1' />
                        Add Project Amount
                    </span>
                )}

                {!isEditing && initialData?.amount && (
                    <>
                        <Pencil className='h-4 w-4 mr-2' />
                        Edit Project Amount
                    </>
                )}
            </Button>
        </CardHeader>
        <CardContent>
            {!isEditing && (
                <div className="text-sm  w-full border  bg-white/70 hover:border-sky-200 -mt-2  rounded-lg p-4">
                    {initialData.currency ?
                    <div className='space-x-2 '>
                        <span className='mr-[3px] font-bold'>{ initialData?.currency }</span>{initialData?.amount}
                    </div>
                    : <span >
                        Project Amount for invoice
                    </span> }
                </div>
            )}
            {isEditing && (
                <div >
                    <Form {...form}>
                        <form 
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-3'
                        >
                            <div className='flex space-x-2'>
                                <FormField
                                    control={form.control}
                                    name="currency"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                <SelectTrigger className='w-[100px]'>
                                                    <SelectValue placeholder="Currency" />
                                                </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="$">$</SelectItem>
                                                    <SelectItem value="₦">₦</SelectItem>
                                                    <SelectItem value="GPB">GPB</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField 
                                    control={form.control}
                                    name='amount'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input 
                                                    disabled={isSubmitting}
                                                    placeholder="30,000"
                                                    {...field }
                                               
                                                    type='number'           
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
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

                </div>
            )}
        </CardContent>
    </Card>
  )
}