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
        // const { data: { user }} = await supabase.auth.getUser();
        const response = await projectTitle({
            name: data?.name ?? '',
            // profile_id: data?.profile_id ?? ''
        })
        setIsUpdating(false);

        if (response) {
            toast({
                variant: "success",
                title: "Success",
                description: profileConfig.successMessage,
            });
            router.push("/protected/contracts/" + response?.id);
        } else {
            toast({
                variant: "destructive",
                title: "Unexpected error",
                description: "An unknown error occurred",
            });
        }     
    }

  return (
    <div>
        <div>
            <h1>Name your project</h1>
            <p>What would you like to name your course? Don&apos;t worry you can change it later</p>
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
                                Course Title
                            </FormLabel>
                            <FormControl>
                                <Input 
                                    disabled={isUpdating}
                                    placeholder="e.g. `Advanced Web Development`"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                What will you teach in this course
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