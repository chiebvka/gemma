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
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"; 
  import { Loader2 as SpinnerIcon } from "lucide-react";
  import { useToast } from "@/components/ui/use-toast";
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
import { Tables } from '@/types/supabase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import FileUpload from '@/components/FileUpload';
import { createInvoice, payInvoice } from '@/actions/invoice/invoices';
import { projectConfig } from '@/config/project';

type Profile = Tables<'profiles'>;

type Props = {
    profile: Profile
}

type InvoiceProduct = {
    itemName: string;
    itemQuantity: number;
    itemPrice: number;
    itemAmount: number;
};
export const dynamic = "force-dynamic";

type InvoiceEditFormValues = z.infer<typeof InvoiceEditFormSchema>;

export default function InvoiceForm({profile}: Props) {

    const router = useRouter();
    const { toast } = useToast();
    const [isSwitchChecked, setIsSwitchChecked] = useState(true);
    const [isEditing, setIsEditing] = useState(false)
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [invoiceNumber, setInvoiceNumber] = useState<string | null>(null);
  


    // const calculateTotal = (products, tax) => {
    //     const subtotal = products.reduce((sum, product) => sum + (product.itemAmount || 0), 0);
    //     const taxAmount = subtotal * (tax / 100);
    //     return subtotal + taxAmount;
    // };
    const calculateTotal = (products: InvoiceProduct[], tax: number): number => {
        const subtotal = products.reduce((sum: number, product: InvoiceProduct) => sum + (product.itemAmount || 0), 0);
        const taxAmount = subtotal * (tax / 100);
        return subtotal + taxAmount;
    };

    const calculateTotalAmount = (): number => {
        const invoiceProducts = form.watch('invoiceProducts') || [];
        const subtotal = invoiceProducts.reduce((sum, product) => sum + (product.itemAmount || 0), 0);
        const tax = form.watch('tax') || 0;
        return subtotal + (subtotal * tax / 100);
    };

    // const calculateTotalAmount = () => {
    //     const subtotal = form.watch('invoiceProducts').reduce((sum, product) => sum + (product.itemAmount || 0), 0);
    //     const tax = form.watch('tax') || 0;
    //     return subtotal + (subtotal * tax / 100);
    // };

    const defaultProducts = [
        {itemName: "First Item", itemQuantity: 1, itemPrice: 200.00, itemAmount: 200.00},
        {itemName: "Second Item", itemQuantity: 2, itemPrice: 189.00, itemAmount: 378.00},
    ];

    const defaultTax = 1.50;
    

    const defaultValues: Partial<InvoiceEditFormValues> = {
        invoiceProducts: defaultProducts,

        companyName: "",
        companyEmail: "",
        companyAddress: "",
        companyMobile: "",
        logoLink: "",
        recepientName: "",
        recepientEmail: "",
        recepientMobile: "",
        recepientAddress: "",
        InvoiceID: "",
        dueDate: new Date(),
        notes: "",
        paymentLink: "",
        tax: defaultTax,
        subTotalAmount: defaultProducts.reduce((sum, product) => sum + product.itemAmount, 0),
        totalAmount: calculateTotal(defaultProducts, defaultTax)
    }


    const form = useForm<InvoiceEditFormValues>({
        resolver: zodResolver(InvoiceEditFormSchema),
        defaultValues,
        mode: "onChange",
    })


    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "invoiceProducts" // Assuming your array of items is named "items"
    });


    const generateInvoiceNumber = (minimum: number, maximum: number) => {
        const randomNumber = Math.floor(Math.random() * (maximum - minimum)) + minimum;
        return 'INV-' + randomNumber;
    }


    // useEffect(() => {
    //     if (!invoiceNumber) {
    //         const newInvoiceNumber = generateInvoiceNumber(17890, 577890);
    //         setInvoiceNumber(newInvoiceNumber);
    //         form.setValue("InvoiceID", newInvoiceNumber);
    //     }
    // }, [invoiceNumber, form]);

    async function onSubmit(data: InvoiceEditFormValues) {
        console.log("Form submitted", data);
        setIsUpdating(true);
        try {
            const response = await createInvoice(data);
            console.log("Create invoice response:", response);
            // ... rest of your code
            toast({
                variant: "success",
                title: "Success",
                description: projectConfig.projectCreateSuccess,
            });
        } catch (error) {
            console.error("Error creating invoice:", error);
            toast({
                variant: "destructive",
                title: "Unexpected error",
                description: projectConfig.projectCreateError,
            });
        } finally {
            setIsUpdating(false);
        }
    }

    // async function onSubmit(data:InvoiceEditFormValues){
    //     setIsUpdating(true)
    //     const response = await createInvoice({
    //         companyName: data.companyName,
    //         companyEmail: data.companyEmail,
    //         companyAddress: data.companyAddress,
    //         companyMobile: data.companyMobile,
    //         recepientName: data.recepientName,
    //         recepientEmail: data.recepientEmail,
    //         recepientAddress: data.recepientAddress,
    //         recepientMobile: data.recepientMobile,
    //         tax: data.tax,
    //         subTotalAmount: data.subTotalAmount,
    //         totalAmount: data.totalAmount,
    //         notes: data.notes,
    //         dueDate: data.dueDate,
    //         logoLink: data.logoLink,
    //         paymentLink: data.paymentLink,
    //         // invoiceProducts: data.invoiceProducts,
    //     })

    //     setIsUpdating(false);

    //     if (response) {
    //         toast({
    //             variant: "success",
    //             title: "Success",
    //             description: projectConfig.projectCreateSuccess,
    //         });
    //     } else {
    //         toast({
    //             variant: "destructive",
    //             title: "Unexpected error",
    //             description: projectConfig.projectCreateError,
    //         });
    //     }     
    // }


    const handleSwitchChange = (event: any) => {
        setIsSwitchChecked(!isSwitchChecked);
    };


    const handlePayment = async () => {
        if (form.formState.isValid) {
          const invoiceData = form.getValues();
          const response = await payInvoice(invoiceData);
          if (response?.url) {
            window.location.href = response.url;
          } else {
            toast({
              variant: "destructive",
              title: "Error",
              description: "Failed to create checkout session",
            });
          }
        } else {
          toast({
            variant: "destructive",
            title: "Form Error",
            description: "Please fill out all required fields",
          });
        }
      };


    return (
        <>
            <div className='w-full'>
                <Form {...form}>
                    <form 
                        onSubmit={(e) => {
                            console.log("Form submission attempt");
                            const isValid = form.formState.isValid;
                            console.log("Form is valid:", isValid);
                            if (!isValid) {
                                console.log("Form errors:", form.formState.errors);
                            }
                            form.handleSubmit(onSubmit)(e);
                        }}
                    >                    
                        <div className="flex flex-col space-y-2 md:flex-row w-full items-start  justify-between">
                            <div className="flex md:flex-col w-full md:justify-start ml-auto items-center md:items-start justify-center my-auto  space-x-3 space-y-3 ">
                                <div className="flex  items-center  space-x-2">
                                    {/* <Switch id="functional" defaultChecked={isSwitchChecked} onChange={handleSwitchChange} />
                                    <Label htmlFor="functional" className="flex flex-col space-y-1">
                                        <span className="font-normal leading-snug text-muted-foreground">
                                            Use default design
                                        </span>
                                    </Label> */}
                                </div>
                                {/* <div className="">
                                    <Button >
                                        Choose Design
                                    </Button>
                                </div> */}
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
                                            name="recepientName"
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
                                            name="recepientEmail"
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
                                            name="recepientAddress"
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
                                            name="recepientMobile"
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
                                </div>
                                <div className="flex basis-1/2 space-y-3 flex-col">
                                    <div className="flex flex-col justify-end my-3 md:border-l-2 border-black ">
                                        {profile?.logoLink  ? (
                                            <div className='flex justify-end'>
                                                <div className='relative aspect-video border border-dashed border-black rounded-lg mt-2 items-center justify-center size-32  bg-slate-200 '>
                                                <Image
                                                    alt="upload"
                                                    fill
                                                    sizes='10'
                                                    className='object-cover size-48 rounded-md'
                                                    src={profile?.logoLink}
                                                />
                                                </div>
                                            </div>
                                        )
                                        :  (
                                            <FormField
                                                control={form.control}
                                                name="logoLink"
                                                render={({field}) => (
                                                    <div  className='flex justify-end '>
                                                        <FormItem className=''>   
                                                            <label htmlFor='logoLink' className='flex justify-end '>
                                                                <FormControl>
                                                                <div>
                                                                    <FileUpload 
                                                                        endpoint='imageUploader'
                                                                        onChange={(url) => {
                                                                            if(url) {
                                                                                form.setValue("logoLink", url);
                                                                                form.trigger("logoLink");
                                                                            }
                                                                            setIsEditing(false)
                                                                        }}
                                
                                                                    /> 
                                                                </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </label>  
                                                        </FormItem>
                                                    </div>
                                                )}
                                            />
                                        )
                                        }
                                        <div className="flex my-3 justify-end">
                                            <span className="flex flex-col w-7/12 space-y-2 items-end ">
                                                {profile?.companyName ?
                                                    <p className='font-bold'>{profile?.companyName}</p>
                                                :
                                                <FormField
                                                    control={form.control}
                                                    name="companyName"
                                                    render={({field}) => (
                                                        <FormItem className='w-full space-y-2'>     
                                                            <FormControl>
                                                            <Input placeholder="Client or Business Address" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                }
                                                {profile?.companyEmail ? 
                                                <p className='font-light text-xs'>{profile?.companyEmail}</p>
                                                :
                                                <FormField
                                                        control={form.control}
                                                        name="companyEmail"
                                                        render={({field}) => (
                                                            <FormItem className='w-full space-y-2'>     
                                                                <FormControl>
                                                                <Input placeholder="Client or Business Address" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                }
                                                {profile?.companyMobile ? 
                                                <p className='font-light text-xs'>{profile?.companyMobile}</p>
                                                :
                                                <FormField
                                                        control={form.control}
                                                        name="companyMobile"
                                                        render={({field}) => (
                                                            <FormItem className='w-full space-y-2'>     
                                                                <FormControl>
                                                                <Input placeholder="Client or Business Address" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                }
                                                {profile?.companyAddress ? 
                                                <p className='font-light text-xs'>{profile?.companyAddress}</p>
                                                :
                                                <FormField
                                                        control={form.control}
                                                        name="companyAddress"
                                                        render={({field}) => (
                                                            <FormItem className='w-full space-y-2'>     
                                                                <FormControl>
                                                                <Input placeholder="Client or Business Address" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                }
                                            
                                            </span>

                                        </div>


                                        {/** Invoice ID only comes up after invoice has been created and only shows up on the individual inoice/receipt page  */}
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
                                                disabled={(date) =>
                                                    date.getTime() < new Date().setHours(0, 0, 0, 0) // Disable dates before today
                                                    // date > new Date() || date < new Date("1900-01-01")
                                                }                        
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
                                    <TableHead className="flex items-center border border-white text-white basis-3/6">Item Name </TableHead>
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
                                            name={`invoiceProducts.${index}.itemName`}
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
                                            name={`invoiceProducts.${index}.itemQuantity`}
                                            render={({field}) => (
                                            <FormItem className='w-full'>     
                                                <FormControl>
                                                <Input type='number' className="no-spinner" placeholder="Quantity" {...field} onChange={(e) => {
                                                    const quantity = parseInt(e.target.value, 10) || 0;
                                                    const price = parseFloat(String(form.getValues(`invoiceProducts.${index}.itemPrice`))) || 0; 
                                                    const amount = quantity * price
                                                    form.setValue(`invoiceProducts.${index}.itemQuantity`, quantity );
                                                    form.setValue(`invoiceProducts.${index}.itemAmount`, amount );
                                                    form.setValue('totalAmount', calculateTotalAmount());
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
                                            name={`invoiceProducts.${index}.itemPrice`}
                                            render={({field}) => (
                                            <FormItem className='w-full'>     
                                                <FormControl>
                                                <Input type='number' className="no-spinner" placeholder="Price" {...field} onChange={(e) => {
                                                    const price = parseFloat(e.target.value) || 0;
                                                    const quantity = parseInt(String(form.getValues(`invoiceProducts.${index}.itemQuantity`)), 10) || 0;
                                                    const amount = quantity * price;
                                                    form.setValue(`invoiceProducts.${index}.itemPrice`, price);
                                                    form.setValue(`invoiceProducts.${index}.itemAmount`, amount);
                                                    form.setValue('totalAmount', calculateTotalAmount());
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
                                            name={`invoiceProducts.${index}.itemAmount`}
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

                            <div className="flex border-2 border-red-600 mx-auto mt-3 justify-end ">
                                <div className="flex  border-2 items-center border-green-600 justify-items-end flex-col space-y-3">
                                    <div className="flex items-center  justify-center space-x-2">
                                        <p className='flex items-start justify-start w-16 text-sm'>Subtotal</p>
                                        <div className="flex justify-end">
                                            <FormField 
                                                control={form.control}
                                                name="subTotalAmount"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                              className="no-spinner"
                                                                {...field}
                                                                value={(form.watch('invoiceProducts') || []).reduce((sum, product) => sum + (product.itemAmount || 0), 0).toFixed(2)}
                                                                readOnly
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                        
                                    </div>
                                    <div className="flex items-center  justify-center space-x-2">
                                        <p className='flex items-start justify-start w-16 text-sm'>Tax (%)</p>
                                        <div className="flex justify-end">
                                            <FormField
                                                control={form.control}
                                                name="tax"
                                                render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            type="number"
                                                            className="no-spinner"
                                                            // min="0"
                                                            // max="100"
                                                            step="0.01"
                                                            placeholder='1.50'
                                                            // onChange={(e) => {
                                                            //     let value = parseFloat(e.target.value);
                                                            //     if (isNaN(value)) {
                                                            //     value = 0;
                                                            //     } else if (value > 100) {
                                                            //     value = 100;
                                                            //     }
                                                            //     e.target.value = value.toString();
                                                            //     field.onChange(e);
                                                            //     const taxValue = parseFloat(e.target.value) || 0;
                                                            //     const subtotal = form.watch('invoiceProducts')?.reduce((sum, product) => sum + (Number(product?.itemAmount) || 0), 0) || 0;
                                                            //     form.setValue('totalAmount', calculateTotalAmount());
                                                            //     form.setValue('totalAmount', total);
                                                            onChange={(e) => {
                                                                let value = parseFloat(e.target.value);
                                                                if (isNaN(value)) {
                                                                    value = 0;
                                                                } else if (value > 100) {
                                                                    value = 100;
                                                                }
                                                                e.target.value = value.toString();
                                                                field.onChange(e);
                                                                form.setValue('totalAmount', calculateTotalAmount());
                                                            }}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center  justify-center space-x-2">
                                        <p className='flex items-start justify-start w-16 text-sm'>Total</p>
                                        <div className="flex justify-end">
                                            <FormField
                                                control={form.control}
                                                name="totalAmount"
                                                render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                    <Input  {...field}    value={calculateTotalAmount().toFixed(2)}  readOnly />
                                                    </FormControl>
                                                </FormItem>
                                                )}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full space-y-3 mt-3 p-2">
                                <FormField
                                    control={form.control}
                                    name="notes"
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

                            <Card className='my-3 md:w-1/3 w-full'>
                                <CardHeader>
                                    <CardTitle>Payment Method</CardTitle>
                                    <CardDescription>
                                    Please click the button below to make your payement 
                                    </CardDescription>
                                </CardHeader>
                                <CardContent >
                                    <span onClick={handlePayment} className="flex flex-col cursor-pointer items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                        <BadgeDollarSign className="mb-3 h-6 w-6" />
                                        Paypal
                                    </span>
                                </CardContent>
                            </Card>
                            <div className="h-8 rounded-b-lg mb-3 bg-black w-full"></div>
                        </div>
                        <div className=" flex my-5 items-center justify-end space-x-3">
                        <Button
                            type='submit'
                                onClick={() => console.log("Submit button clicked")}
                            className="flex !bg-gray-900 px-10 !text-white hover:!bg-gray-800"
                        >
                            Submit
                        </Button>
                            <Button
                            // type="button"
                            onClick={() => router.back()}
                            className="flex !bg-gray-100 px-10 !text-gray-900 hover:!bg-gray-200"
                            // disabled={isSaving}
                            >
                            Cancel
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
        </>
    )
}

