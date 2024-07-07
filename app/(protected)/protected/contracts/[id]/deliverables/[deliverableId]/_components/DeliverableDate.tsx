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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Pencil, PlusCircle, Loader2 as SpinnerIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { deliverableDate } from '@/lib/validation/deliverable';
import { updatdeDeliverableDate } from '@/actions/deliverables/deliver';
import { deliverableConfig } from '@/config/deliverables';
import { format } from 'date-fns';


type Props = {
  initialData: {
    due_date: Date
};
id: string;
deliverableId: string
}

type DeliverableDateValue = z.infer<typeof deliverableDate>

export default function DeliverableDate({initialData, id, deliverableId}: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing((current) => !current)

  const defaultValues: Partial<DeliverableDateValue> = {
    due_date: initialData?.due_date || "",
  };

  const form = useForm<DeliverableDateValue>({
    resolver: zodResolver(deliverableDate),
    defaultValues,
    mode: "onChange",
  });


  const { isSubmitting, isValid } = form.formState


  async function onSubmit(data:DeliverableDateValue){
    // const utcDueDate = new Date(data.due_date).toISOString();
    const response = await updatdeDeliverableDate({
      due_date: data?.due_date, 
      id: deliverableId,
      project_id: id
    })

    console.log(response)
    if(response) {
      toast({
          variant: "success",
          title: "Success",
          description: (deliverableConfig.deliverableDueDateUpdateSuccess),
      })
      location.reload()  
  } else {
      toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: (deliverableConfig.deliverableDueDateUpdateError),
          })
      }
  }


  return (
    <Card className='mt-6 border bg-gradient-to-br from-[#f0f0f0] to-[#e0e0e0] shadow-lg rounded-md border-black'>
       <CardHeader className="font-medium flex flex-row items-center justify-between">
          Deliverable due date
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing && (
                <>Cancel</>
            )} 
            {!isEditing && !initialData?.due_date && (
                <span className='text-xs flex'>
                    <PlusCircle className='h-4 w-4 mr-1' />
                    Add a due date
                </span>
            )}
            {!isEditing && initialData?.due_date && (
              <>
                  <Pencil className='h-4 w-4 mr-2' />
                  Edit due date
              </>
            )}
          </Button>
       </CardHeader>
       <CardContent>
        {!isEditing && (
          <p className="text-sm  w-full border  border-black/60 bg-white/70 hover:border-sky-200 -mt-2  rounded-lg p-4">
            {initialData.due_date ? format(new Date(initialData.due_date), "PPP") : "Please set a future date"}
            {/* format(parseISO(journal?.created_at!), "MMMM dd, yyyy") */}
              {/* {format(initialData.due_date, "PPP") || "Please set a future date"} */}
          </p>
        )}
        {isEditing && (
            <Form {...form}>
              <form 
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-2 -mt-2'
              >
                {/* <CalendarDays /> */}
                <FormField 
                    control={form.control}
                    name='due_date'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {/* Deliverable Title */}
                            </FormLabel>
                            <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date.getTime() < new Date().setHours(0, 0, 0, 0) // Disable dates before today
                      // date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
                            {/* <FormControl>
                                <Input 
                                    disabled={isSubmitting}
                                    placeholder="Your Deliverable Title"
                                    {...field}
                                />
                            </FormControl> */}
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