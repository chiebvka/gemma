"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from  "@/components/ui/select";
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
import { ReceiptEditFormSchema } from '@/lib/validation/receipt';
import ReceiptDownload from './ReceiptDownload';
import ReceiptPreview from './ReceiptPreview';
import ReceiptShare from './ReceiptShare';
import { Checkbox } from '@/components/ui/checkbox';

type Props = {}
export const dynamic = "force-dynamic";

type ReceiptEditFormValues = z.infer<typeof ReceiptEditFormSchema>;

export default  function ReceiptForms({}: Props) {
    const router = useRouter();
    const [isSwitchChecked, setIsSwitchChecked] = useState(true);
    const [subtotal, setSubtotal] = useState<number>(0);
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [invoiceNumber, setInvoiceNumber] = useState<string | null>(null);
    
  
    const defaultValues: Partial<ReceiptEditFormValues> = {
      receiptItems: [
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
    //   itemQuantity: 0,
    //   itemAmount: 0,
      receipientAddress: "",
      receiptID: "",
      dueDate: "",
      itemName: "",
    //   taxAmount: 0,
    //   itemSubtotal: 0,
    //   itemTotal: 0,
      receiptNote: "",

    }
    const form = useForm<ReceiptEditFormValues>({
      resolver: zodResolver(ReceiptEditFormSchema),
      defaultValues,
    })
  
    const { fields, append, remove } = useFieldArray({
      control: form.control,
  
      name: "receiptItems" // Assuming your array of items is named "items"
    });


    const calculateTotal = () => {
        let taxes = form.getValues("taxAmount") || 0
        let subTotal = form.getValues("itemSubtotal") || 0
        let itemTotal = 0
        if (taxes  ) {
            itemTotal = taxes/ 100 * subTotal 
        } 
        form.setValue("itemTotal", itemTotal)
    }


    const updateSubtotal = () => {
        let total = 0;
        fields.forEach((item, index) => {
            const itemAmount = parseFloat(form.getValues(`receiptItems.${index}.itemAmount`).toString());
            if (!isNaN(itemAmount)) {
                total += itemAmount;
            }
        });
        calculateTotal()
        form.setValue("itemSubtotal", total);
    };


    
    
    


    const generateInvoiceNumber = (minimum: number, maximum: number) => {
        const randomNumber = Math.floor(Math.random() * (maximum - minimum)) + minimum;
        return 'REC-' + randomNumber;
    }

    // useEffect(() => {
    //     if (!invoiceNumber) {
    //         setInvoiceNumber(generateInvoiceNumber(17890, 577890));
    //     }
    // }, []);

    useEffect(() => {
        if (!invoiceNumber) {
            const newInvoiceNumber = generateInvoiceNumber(17890, 577890);
            setInvoiceNumber(newInvoiceNumber);
            form.setValue("receiptID", newInvoiceNumber);
        }

    }, [invoiceNumber, form]);




  const handleSwitchChange = (event: any) => {
    setIsSwitchChecked(!isSwitchChecked);
  };
  return (
    <>
        <div className='w-full '>
            <Form {...form} >
                <form action={""}>                    
                    <div className="flex flex-col space-y-2 md:flex-row w-full items-start  justify-between">
                        <div className="flex md:flex-col w-full md:justify-start ml-auto items-center md:items-start justify-center my-auto  space-x-3 space-y-3 ">
                            <div className="flex  items-center  space-x-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="terms" />
                                    <Label htmlFor="terms">Add recepient to receipient list</Label>
                                </div>
                            </div>
                            {/* <div className="">
                                <Button >
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                    Choose Design
                                </Button>
                            </div> */}
                        </div>
                        <div className="flex w-full md:justify-end justify-center  space-x-3 my-auto ml-auto ">
                            <ReceiptDownload />
                            <ReceiptPreview />
                            <ReceiptShare />
                        </div>
                    </div>
                    <Separator className='my-5' />
                    <div className="flex flex-col border-2 p-2 border-black rounded-lg shadow-xl">
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
                                </div>
                                <div className="flex basis-1/2 space-y-3 flex-col">
                                    <div className="flex flex-col justify-end my-3 md:border-l-2 border-black ">
                                        <FormField
                                            control={form.control}
                                            name="branding"
                                            render={({field}) => (
                                            <div  className='flex justify-end '>
                                                <FormItem className=' flex justify-center items-center border-2 border-dashed rounded border-black size-32  space-y-2 '>   
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
                                            <p className="font-bold">Receipt ID: </p>
                                            <FormField
                                                control={form.control}
                                                name="receiptID"
                                                render={({field}) => (
                                                    <FormItem className=' w-48 space-y-2 '>     
                                                        <FormControl>
                                                        <Input placeholder="Client or Business Name" {...field} readOnly />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                    

                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col space-x-3 mt-3 p-2 ">
                                <p className="font-bold">Issue Date: </p>
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
                                                    <span>Pick an issue date</span>
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
                                                disabled={(date) => date > new Date() || date < new Date('1900-01-01')}                        
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
                                        name={`receiptItems.${index}.itemName`}
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
                                        name={`receiptItems.${index}.itemQuantity`}
                                        render={({field}) => (
                                        <FormItem className='w-full'>     
                                            <FormControl>
                                            <Input type='number' placeholder="Quantity" {...field} onChange={(e) => {
                                                const quantity = parseInt(e.target.value);
                                                const price = parseFloat(form.getValues(`receiptItems.${index}.itemPrice`).toString());
                                                form.setValue(`receiptItems.${index}.itemAmount`, quantity * price);
                                                updateSubtotal()
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
                                        name={`receiptItems.${index}.itemPrice`}
                                        render={({field}) => (
                                        <FormItem className='w-full'>     
                                            <FormControl>
                                            <Input type='number' placeholder="Price" {...field} onChange={(e) => {
                                                const price = parseFloat(e.target.value);
                                                const quantity = parseInt(form.getValues(`receiptItems.${index}.itemQuantity`).toString());
                                                form.setValue(`receiptItems.${index}.itemAmount`, quantity * price);
                                                updateSubtotal()
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
                                        name={`receiptItems.${index}.itemAmount`}
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
                                    <div className="flex flex-col justify-end  items-end space-y-3">
                                        <div className="flex items-center space-x-2">
                                            <p className='font-bold'>Subtotal: </p>
                                            <FormField
                                                control={form.control}
                                                name="itemSubtotal"
                                                render={({field}) => (
                                                    <FormItem className=' w-32 space-y-2 '>     
                                                        <FormControl>
                                                        <Input placeholder="Sub Total" type='number'  {...field}  readOnly  />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <p className='font-bold'>Taxes: </p>
                                            <FormField
                                                control={form.control}
                                                name="taxAmount"
                                                render={({field}) => (
                                                    <FormItem className=' w-32 space-y-2 '>     
                                                        <FormControl>
                                                        <Input placeholder="Tax Amount"  type='number' {...field}  />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <p className='font-bold'>Total: </p>
                                            <FormField
                                                control={form.control}
                                                name="itemTotal"
                                                render={({field}) => (
                                                    <FormItem className=' w-32 space-y-2 '>     
                                                        <FormControl>
                                                        <Input placeholder="Total" type='number' {...field}  readOnly />
                                                        </FormControl>
                                                        <FormMessage />
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
                                    name="receiptNote"
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

                            <div className="h-8 rounded-b-lg mb-3 bg-black w-full"></div>
                        </div>
                        <div className="infline-flex flex my-5 items-center justify-end space-x-3">
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
                    </div>
                </form>
            </Form>
        </div>
    </>
  )
}