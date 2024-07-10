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
import { deliverableStatus } from '@/lib/validation/deliverable';
import { updateDeliverableComplete } from '@/actions/deliverables/deliver';
import { deliverableConfig } from '@/config/deliverables';
type Props = {
    initialData: {
        isComplete: boolean
    };
    id: string;
    deliverableId: string
}

type DeliverableStatusValue= z.infer<typeof deliverableStatus>

export default function DeliverableSwitch({initialData, id, deliverableId}: Props) {
    const router = useRouter();
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false)
    const toggleEdit = () => setIsEditing((current) => !current)

    const defaultValues: Partial<DeliverableStatusValue> = {
        isComplete: initialData?.isComplete,
    };


    const form = useForm<DeliverableStatusValue>({
        resolver: zodResolver(deliverableStatus),
        defaultValues,
        mode: "onChange",
    });

    const { isSubmitting, isValid } = form.formState

    async function onSubmit(data:DeliverableStatusValue){
        const response = await updateDeliverableComplete({
            isComplete: data?.isComplete,
            id: deliverableId,
            project_id: id
        })
        console.log(response)
        if(response) {
            toast({
                variant: "success",
                title: "Success",
                description: (deliverableConfig.deliverableStatusSuccess),
            })
            location.reload()  
        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: (deliverableConfig.deliverableStatusrError),
                })
            }
        }

  return (
    <Card className='mt-6 border bg-gradient-to-br from-[#f0f0f0] to-[#e0e0e0] shadow-lg rounded-md border-black'>   
        <CardHeader className="font-medium flex flex-row items-center justify-between">
            Deliverable Status
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-2 -mt-2'
                >
                <FormField 
                    control={form.control}
                    name='isComplete'
                    render={({ field }) => (
                        <FormItem className=' w-full flex flex-row items-center justify-between border bg-white/70 hover:border-sky-200 -mt-2  rounded-lg p-4'>
                            <div className="space-y-0.5">
                                <FormLabel className="text-sm">
                                Marketing emails
                                </FormLabel>
                                <FormDescription className='text-black text-xs'>
                                    Done with this deliverable? just switch on the button and submit below
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
                        disabled={!isValid || isSubmitting}
                        type='submit'
                    >
                        Complete Deliverable
                    </Button>
                </div>
                </form>
            </Form>
        </CardContent>
    </Card>
  )
}