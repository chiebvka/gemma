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
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from '@/lib/utils';
import ClientForm from './ClientForm';

type Client = {
  id: string;
  name: string;
  email: string;
  address: string;
};

type Props = {
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



export default function ClientCard({clients}: Props) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")





  return (
    <Card className='mt-6 border bg-slate-100 border-black shadow-lg rounded-md'>
        <CardHeader className="font-medium flex flex-row items-center justify-between">
            Choose Client
        </CardHeader>
        <CardContent>
            <Popover open={open} onOpenChange={setOpen}>
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
                            {/* <SheetHeader>
                                <SheetTitle>Create New Client</SheetTitle>
                            </SheetHeader> */}
                        </SheetContent>
                    </Sheet>
                </PopoverContent>
            </Popover>
        </CardContent>
    </Card>
  )
}