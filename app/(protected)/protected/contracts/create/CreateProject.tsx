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
import { Loader2 as SpinnerIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useToast } from "@/components/ui/use-toast";
import { projectTitleSchema } from '@/lib/validation/project';

import { profileConfig } from '@/config/profile';
import { projectTitle } from '@/actions/projects/project';
import { User } from '@supabase/supabase-js';
import { projectConfig } from '@/config/project';

type Props = {

}

type ProjectTitleValues = z.infer<typeof projectTitleSchema>;

export default function CreateProject({}: Props) {
    const router = useRouter();
    const { toast } = useToast();
    const [isUpdating, setIsUpdating] = useState<boolean>(false);


    const form = useForm<ProjectTitleValues>({
        resolver: zodResolver(projectTitleSchema),
        defaultValues: {
            name: ""
        },
        mode: "onChange",
    })

    async function onSubmit(data:ProjectTitleValues) {
        setIsUpdating(true)
        const response = await projectTitle({
            name: data?.name ?? '',
        })
        setIsUpdating(false);

        if (response) {
            toast({
                variant: "success",
                title: "Success",
                description: projectConfig.projectCreateSuccess,
            });
            router.push("/protected/contracts/" + response?.id);
        } else {
            toast({
                variant: "destructive",
                title: "Unexpected error",
                description: projectConfig.projectCreateError,
            });
        }     
    }

  return (
    <div>
        <div>
            <h1 className='font-bold text-2xl'>Name your project</h1>
            <p className='text-muted-foreground text-sm my-3'>What would you like to name your project? You ca always edit the name later</p>
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
                                Project Name
                            </FormLabel>
                            <FormControl>
                                <Input 
                                    disabled={isUpdating}
                                    placeholder="e.g. ABC's blog posts for 2024"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                What is the project about?
                            </FormDescription>
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
                            Continue
                        </Button>
                    </div>
                </form>
            </Form>
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
    </div>
  )
}