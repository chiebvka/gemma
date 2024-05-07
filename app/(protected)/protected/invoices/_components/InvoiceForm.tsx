"use client"

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import React, { useState, useEffect } from 'react';
import InvoiceShare from './InvoiceShare';
import InvoicePreview from './InvoicePreview';
import InvoiceDownload from './InvoiceDownload';
import { zodResolver } from "@hookform/resolvers/zod";
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
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { useFieldArray, useForm } from 'react-hook-form';
import { InvoiceEditFormSchema } from '../../../../../lib/validation/invoice';
import * as z from "zod";
import { Input } from '@/components/ui/input';
import { BadgeDollarSign, CalendarDays, Plus, UploadCloud, XIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';
import {
     Card,
     CardContent,
     CardDescription,
     CardFooter,
     CardHeader,
     CardTitle,
    } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

type Props = {}
export const dynamic = "force-dynamic";

type InvoiceEditFormValues = z.infer<typeof InvoiceEditFormSchema>;

export default function InvoiceForm({}: Props) {

    const router = useRouter();
    const [isSwitchChecked, setIsSwitchChecked] = useState(true);
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [invoiceNumber, setInvoiceNumber] = useState<string | null>(null);
  

  const defaultValues: Partial<InvoiceEditFormValues> = {
    invoiceItems: [
        {itemName: "First Item", itemQuantity: 1, itemPrice: 200.00, itemAmount: 200.00},
        {itemName: "Second Item", itemQuantity: 2, itemPrice: 189.00,  itemAmount: 378.00},
    ],
    branding: "",
    senderName: "",
    senderEmail: "",
    senderAddress: "",
    senderPhone: 0,
    receipientName: "",
    receipientEmail: "",
    receipientPhone: 0,
    itemQuantity: 0,
    itemAmount: 0,
    receipientAddress: "",
    InvoiceID: "",
    dueDate: "",
    itemName: "",
    InvoiceNote: "",
    paymentLink: "",
  }
  const form = useForm<InvoiceEditFormValues>({
    resolver: zodResolver(InvoiceEditFormSchema),
    defaultValues,
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,

    name: "invoiceItems" // Assuming your array of items is named "items"
  });

    const generateInvoiceNumber = (minimum: number, maximum: number) => {
        const randomNumber = Math.floor(Math.random() * (maximum - minimum)) + minimum;
        return 'INV-' + randomNumber;
    }

    useEffect(() => {
        if (!invoiceNumber) {
            const newInvoiceNumber = generateInvoiceNumber(17890, 577890);
            setInvoiceNumber(newInvoiceNumber);
            form.setValue("InvoiceID", newInvoiceNumber);
        }
    }, [invoiceNumber, form]);




  const handleSwitchChange = (event: any) => {
    setIsSwitchChecked(!isSwitchChecked);
  };
  return (
    <>
        <div className='w-full'>
            <Form {...form}>
                <form action={""}>                    
                    <div className="flex flex-col space-y-2 md:flex-row w-full items-start  justify-between">
                        <div className="flex md:flex-col w-full md:justify-start ml-auto items-center md:items-start justify-center my-auto  space-x-3 space-y-3 ">
                            <div className="flex  items-center  space-x-2">
                                {/* <div className="flex items-center space-x-2">
                                    <Checkbox id="terms" />
                                    <Label htmlFor="terms">Accept terms and conditions</Label>
                                </div> */}
                                <Switch id="functional" defaultChecked={isSwitchChecked} onChange={handleSwitchChange} />
                                <Label htmlFor="functional" className="flex flex-col space-y-1">
                                    <span className="font-normal leading-snug text-muted-foreground">
                                        Use default design
                                    </span>
                                </Label>
                            </div>
                            <div className="">
                                <Button >
                                    {/* <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> */}
                                    Choose Design
                                </Button>
                            </div>
                        </div>
                        <div className="flex w-full md:justify-end justify-center  space-x-3 my-auto ml-auto ">
                            <InvoiceDownload />
                            <InvoicePreview />
                            <InvoiceShare />
                        </div>
                    </div>
                    <Separator className='my-5' />
                    <div className="">
                        <div className="h-8 rounded-t-lg bg-black w-full"></div>
                        <div className="flex md:flex-row flex-col-reverse space-x-3 gap-2 p-2">
                            <div className="flex basis-1/2 space-y-3 flex-col">         
                                <div className="flex-col space-y-3">
                                    <h4 className='font-bold text-lg'>Bill To:</h4>
                                    <FormField
                                        control={form.control}
                                        name="receipientName"
                                        render={({field}) => (
                                            <FormItem className='w-full space-y-2 '>     
                                                <FormControl>
                                                <Input placeholder="Client or Business Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="receipientEmail"
                                        render={({field}) => (
                                            <FormItem className='w-full space-y-2'>     
                                                <FormControl>
                                                <Input placeholder="Client or Business Email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="receipientAddress"
                                        render={({field}) => (
                                            <FormItem className='w-full space-y-2'>     
                                                <FormControl>
                                                <Input placeholder="Client or Business Address" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="receipientPhone"
                                        render={({field}) => (
                                            <FormItem className='w-full space-y-2'>     
                                                <FormControl>
                                                <Input placeholder="Client or Business Mobile" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {/* <div className="flex-col space-y-3">
                                <h4 className='font-bold text-lg'>Bill To:</h4>
                                    <FormField
                                        control={form.control}
                                        name="receipientName"
                                        render={({field}) => (
                                            <FormItem className='w-full border-2 space-y-2 border-green-600'>     
                                                <FormControl>
                                                <Input placeholder="Client or Business Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="receipientEmail"
                                        render={({field}) => (
                                            <FormItem className='w-full border-2 space-y-2 border-green-600'>     
                                                <FormControl>
                                                <Input placeholder="Client or Business Email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="receipientAddress"
                                        render={({field}) => (
                                            <FormItem className='w-full border-2 space-y-2 border-green-600'>     
                                                <FormControl>
                                                <Input placeholder="Client or Business Address" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="receipientPhone"
                                        render={({field}) => (
                                            <FormItem className='w-full border-2 space-y-2 border-green-600'>     
                                                <FormControl>
                                                <Input placeholder="Client or Business Mobile" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div> */}
                            </div>
                            <div className="flex basis-1/2 space-y-3 flex-col">
                                <div className="flex flex-col justify-end my-3 md:border-l-2 border-black ">
                                    <FormField
                                        control={form.control}
                                        name="branding"
                                        render={({field}) => (
                                            <div  className='flex justify-end '>
                                                <FormItem className=' flex justify-center items-center border-2 border-dashed rounded border-black size-32  space-y-2'>   
                                                    <label htmlFor='branding' className='flex justify-end '>
                                                        <FormControl>
                                                            <div className="flex flex-col cursor-pointer items-center justify-center  border-dashed border-gray-400 rounded">
                                                                <div className="text-center">
                                                                    <FormLabel htmlFor="branding" className="flex flex-col items-center gap-2 cursor-pointer"></FormLabel>
                                                                    <UploadCloud className='mx-auto text-black' aria-hidden='true' size={20} />
                                                                    <span className='text-xs'>Upload your logo</span>
                                                                    <Input type='file' id="branding"  className='sr-only' {...field} />
                                                                </div>
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </label>  
                                                </FormItem>
                                            </div>
                                        )}
                                    />
                                    <div className="flex justify-end">
                                        <span className="flex flex-col items-end ">
                                            <p className='font-bold'>ABC Company</p>
                                            <p className='font-light text-xs'>ABC Email</p>
                                            <p className='font-light text-xs'>ABC Address</p>
                                            <p className='font-light text-xs'>ABC Mobile</p>
                                        </span>

                                    </div>

                                    <div className="flex items-center space-x-2 mt-3 justify-end">
                                        <p className="font-bold">Invoice Number: </p>
                                        <FormField
                                            control={form.control}
                                            name="InvoiceID"
                                            render={({field}) => (
                                                <FormItem className=' w-48 space-y-2 '>     
                                                    <FormControl>
                                                    <Input placeholder="Client or Business Name" {...field} readOnly />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* <div className="border px-3 border-black">
                                            INV 00012
                                        </div> */}
                                    </div>
                  

                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col space-x-3 mt-3 p-2 ">
                            <p className="font-bold">Due Date: </p>
                            <FormField
                                control={form.control}
                                name="dueDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px]  text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                            >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a due date</span>
                                            )}
                                            <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            // selected={field.value}
                                            onSelect={field.onChange}                          
                                            initialFocus
                                        />
                                        </PopoverContent>
                                    </Popover>

                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Table className=' mt-3 w-full'>
                            <TableHeader className='bg-black w-full rounded-lg text-white'>
                                <TableRow className='flex w-full'>
                                <TableHead className="flex items-center border border-white text-white basis-3/6">Item Name or Description</TableHead>
                                <TableHead className="flex items-center border border-white text-white basis-1/6">Quantity</TableHead>
                                <TableHead className="flex items-center border border-white text-white basis-1/6">Price</TableHead>
                                <TableHead className="flex items-center border border-white text-white basis-1/6">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className='w-full '>
                            {fields.map((item, index) => (
                            <TableRow key={item.id} className='flex'>
                                <TableCell className='flex basis-3/6'>
                                <FormField
                                    control={form.control}
                                    name={`invoiceItems.${index}.itemName`}
                                    render={({field}) => (
                                    <FormItem className='w-full'>     
                                        <FormControl>
                                        <Input type='text' placeholder="Item Name or Description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                </TableCell>
                                <TableCell className='flex basis-1/6'>
                                <FormField
                                    control={form.control}
                                    name={`invoiceItems.${index}.itemQuantity`}
                                    render={({field}) => (
                                    <FormItem className='w-full'>     
                                        <FormControl>
                                        <Input type='number' placeholder="Quantity" {...field} onChange={(e) => {
                                            const quantity = parseInt(e.target.value);
                                            const price = parseFloat(form.getValues(`invoiceItems.${index}.itemPrice`).toString());
                                            form.setValue(`invoiceItems.${index}.itemAmount`, quantity * price);
                                            field.onChange(e);
                                        }} />
                                        {/* <Input type='number' placeholder="Quantity" {...field} onChange={(e) => handleItemQuantityChange(index, parseInt(e.target.value))} /> */}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                </TableCell>
                                <TableCell className='flex basis-1/6'>
                                <FormField
                                    control={form.control}
                                    name={`invoiceItems.${index}.itemPrice`}
                                    render={({field}) => (
                                    <FormItem className='w-full'>     
                                        <FormControl>
                                        <Input type='number' placeholder="Price" {...field} onChange={(e) => {
                                            const price = parseFloat(e.target.value);
                                            const quantity = parseInt(form.getValues(`invoiceItems.${index}.itemQuantity`).toString());
                                            form.setValue(`invoiceItems.${index}.itemAmount`, quantity * price);
                                            field.onChange(e);
                                        }} />
                                        {/* <Input type='number' placeholder="Price" {...field} onChange={(e) => handleItemPriceChange(index, parseFloat(e.target.value))}  /> */}
                                        </FormControl>
                              
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                </TableCell>
                                <TableCell className='flex basis-1/6'>
                                <FormField
                                    control={form.control}
                                    name={`invoiceItems.${index}.itemAmount`}
                                    render={({field}) => (
                                    <FormItem className='w-full'>     
                                        <FormControl>
                                        <Input type='number' placeholder="Amount" {...field} readOnly />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                </TableCell>
                                <TableCell className='w-4 h-4 flex items-center hover:opacity-35 justify-center my-auto rounded-full'>
                                <div className="text-red-600 cursor-pointer" onClick={() => remove(index)}>
                                    <XIcon size={16} />
                                    <span className="sr-only">Remove</span>
                                </div>
                                </TableCell>
                            </TableRow>
                            ))}
                            </TableBody>
                            <TableFooter>
                      
                                <TableRow>
                                <TableCell colSpan={3} className='border'>
                                    <div className="flex bg-black rounded-lg text-center cursor-pointer hover:shadow-xl transition  items-center justify-center w-8 h-8 " onClick={() => append({ itemName: '', itemQuantity: 0, itemPrice: 0, itemAmount: 0})}>
                                    <Plus size={20} className='text-white' />
                                    </div>
                                </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>

                        <div className="flex w-10/12 mx-auto mt-3 justify-end ">
                            <div className="flex space-x-12">
                                <div className="flex items-start flex-col space-y-3">
                                    <p>Subtotal</p>
                                    <p>Tax</p>
                                    <p>Total</p>
                                </div>
                                <div className="flex flex-col justify-end  items-end space-y-3">
                                    <p>Subtotal</p>
                                    <p>Tax</p>
                                    <p>Total</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full space-y-3 mt-3 p-2">
                            <FormField
                                control={form.control}
                                name="InvoiceNote"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Notes</FormLabel>
                                    <FormControl>
                                        <Textarea
                                        placeholder=""
                                        className="w-full"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                    Notes - any relevant information not covered, additional terms and conditions
                                    </FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Card className='my-3 w-1/3'>
                            <CardHeader>
                                <CardTitle>Payment Method</CardTitle>
                                <CardDescription>
                                Please click the button below to make your payement 
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                            <div>
               
                                <Label
                                htmlFor="paypal"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                <BadgeDollarSign className="mb-3 h-6 w-6" />
                                Paypal
                                </Label>
                            </div>
                            </CardContent>
                        </Card>
                        <div className="h-8 rounded-b-lg mb-3 bg-black w-full"></div>
                    </div>
                    <div className=" flex my-5 items-center justify-end space-x-3">
                        <Button
                        type="submit"
                        className="flex !bg-gray-900 px-10 !text-white hover:!bg-gray-800"
                        // disabled={isSaving}
                        >
                        Submit
                        </Button>
                        <Button
                        type="button"
                        onClick={() => router.back()}
                        className="flex !bg-gray-100 px-10 !text-gray-900 hover:!bg-gray-200"
                        // disabled={isSaving}
                        >
                        Cancel
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    </>
  )
}