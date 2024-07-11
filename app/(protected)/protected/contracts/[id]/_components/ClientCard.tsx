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
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command";
  import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";

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
import { Check, ChevronsUpDown, Pencil, PlusCircle } from "lucide-react"
import { cn } from '@/lib/utils';
import ClientForm from './ClientForm';
import { projectClientSchema } from '@/lib/validation/project';
import { updateProjectClient } from '@/actions/projects/project';
import { projectConfig } from '@/config/project';

type Client = {
  id: string;
  name: string;
  email: string;
  address: string;
};

type Props = {
    initialData: {
      id: string
      client_id: {
        name: string
      }
  };
    clients:Client[]
}
const frameworks = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ]


type ProjectClientValues = z.infer<typeof projectClientSchema>


export default function ClientCard({clients, initialData}: Props) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const router = useRouter();
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false)
    const toggleEdit = () => setIsEditing((current) => !current)


    const defaultValues: Partial<ProjectClientValues> = {
      client_id: clients.length > 0 ? clients[0].id : "",
  };

  const form = useForm<ProjectClientValues>({
    resolver: zodResolver(projectClientSchema),
    defaultValues,
    mode: "onChange",
});

const { isSubmitting, isValid } = form.formState

async function onSubmit(data:ProjectClientValues){
  try {    
    const response = await updateProjectClient({
      id: initialData?.id,
      client_id: data?.client_id
    })
    toast({
      variant: "success",
      title: "Success",
      description: (projectConfig.projectClientUpdateSuccess),
      })  
      location.reload() 

  } catch (error) {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: (projectConfig.projectClientUpdateError),
      })
  }

    
}




  return (
    <Card className='mt-6 border bg-gradient-to-br from-[#f0f0f0] to-[#e0e0e0] border-black shadow-lg rounded-md'>
        <CardHeader className="font-medium flex flex-row items-center justify-between">
            Choose Client
            <Button onClick={toggleEdit} variant="ghost">
            {isEditing && (
                    <>Cancel</>
                )} 
                {!isEditing && !initialData?.client_id && (
                    <span className='text-xs flex'>
                        <PlusCircle className='h-4 w-4 mr-1' />
                        Add a client
                    </span>
                )}

                {!isEditing && initialData?.client_id && (
                    <>
                        <Pencil className='h-4 w-4 mr-2' />
                        Edit Client
                    </>
                )}
            </Button>
        </CardHeader>
        <CardContent>
        {!isEditing && (
                <p className="text-sm  w-full border  bg-white/70 hover:border-sky-200 -mt-2  rounded-lg p-4">
                    {initialData?.client_id?.name}
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
                    name='client_id'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                              Select a Client
                            </FormLabel>
                        
                            <Popover open={open} onOpenChange={setOpen}>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={open}
                                  className="w-full justify-between"
                                  >
                                  {value
                                      ? clients.find((client) => client.name === value)?.name
                                      : "Select Client..."}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="flex flex-col p-0">
                                  <Command>
                                      <CommandInput placeholder="Search Client List..." />
                                      <CommandList>
                                          <CommandEmpty>You don't have a client list yet</CommandEmpty>
                                          <CommandGroup>
                                          {clients.map((client) => (
                                              <CommandItem
                                              key={client?.id}
                                              value={client?.name}
                                              onSelect={(currentValue) => {
                                                  setValue(currentValue === value ? "" : currentValue)
                                                  setOpen(false)
                                                  field.onChange(client.id)
                                              }}
                                              >
                                              <Check
                                                  className={cn(
                                                  "mr-2 h-4 w-4",
                                                  value === client.id ? "opacity-100" : "opacity-0"
                                                  )}
                                              />
                                              {client.name}
                                              </CommandItem>
                                          ))}
                                          </CommandGroup>
                                      </CommandList>
                                  </Command>
                                  <Sheet>
                                      <SheetTrigger asChild>
                                          <Button className='mx-4 my-2'>Add a Client</Button>
                                      </SheetTrigger>
                                      <SheetContent side={'left'}>
                                          <ClientForm />
                                          {/* <SheetHeader>
                                              <SheetTitle>Create New Client</SheetTitle>
                                          </SheetHeader> */}
                                      </SheetContent>
                                  </Sheet>
                              </PopoverContent>
                            </Popover>
                  
                            <FormDescription>
                              Select from a list of all your clients 
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
                          Save Client
                        </Button>
                    </div>
                </form>
              </Form>
            )}
        </CardContent>
    </Card>
  )
}
{/* <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
        <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="w-full justify-between"
        >
        {value
            ? clients.find((client) => client.name === value)?.name
            : "Select Client..."}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
    </PopoverTrigger>
    <PopoverContent className="flex flex-col p-0">
        <Command>
            <CommandInput placeholder="Search Client List..." />
            <CommandList>
                <CommandEmpty>You don't have a client list yet</CommandEmpty>
                <CommandGroup>
                {clients.map((client) => (
                    <CommandItem
                    key={client?.id}
                    value={client?.name}
                    onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setOpen(false)
                    }}
                    >
                    <Check
                        className={cn(
                        "mr-2 h-4 w-4",
                        value === client.id ? "opacity-100" : "opacity-0"
                        )}
                    />
                    {client.name}
                    </CommandItem>
                ))}
                </CommandGroup>
            </CommandList>
        </Command>
        <Sheet>
            <SheetTrigger asChild>
                <Button className='mx-4 my-2'>Add a Client</Button>
            </SheetTrigger>
            <SheetContent side={'left'}>
                <ClientForm />
       
            </SheetContent>
        </Sheet>
    </PopoverContent>
</Popover> */}