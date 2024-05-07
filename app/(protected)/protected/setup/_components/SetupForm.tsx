import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ProfileFormSchema } from '@/lib/validation/profile';
import { UploadCloud } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type Props = {}

type FinanceFormValues = z.infer<typeof ProfileFormSchema>

export default function SetupForm({}: Props) {

  const defaultValues:Partial<FinanceFormValues> = {
    
  }

  const form = useForm<FinanceFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues

})
  return (
    <div className='w-full'>
      <Form {...form}>
        <form action="" className='space-y-4 w-full '>
          <div className="grid gap-30 w-full border-2 border-black grid-cols-2">
            <div className="flex border-2 border-black flex-col">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input disabled placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name. It can be your real name or a
                        pseudonym. You can only change this once every 30 days.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <div className="flex border-2 border-black flex-col">
              <Separator className='space-y-3' />
              <div className="flex flex-col">
                  <h3 className="text-lg font-medium">Invoice and Receipt </h3>
                  <p className="text-sm text-muted-foreground">
                    This is how others will see you on the site.
                  </p>
              </div>
              <FormField
                control={form.control}
                name="logoLink"
                render={({field}) => (
                    <div  className='flex flex-col space-y-3 '>
                        <FormLabel htmlFor="branding" className="flex items-center gap-2 cursor-pointer">Your Logo</FormLabel>
                        <FormItem className=' flex justify-center items-center border-2 border-dashed rounded border-black size-32  space-y-2'>   
                            <label htmlFor='branding' className='flex flex-col '>
                                <FormControl>
                                    <div className="flex flex-col cursor-pointer items-center justify-center  border-dashed border-gray-400 rounded">
                                      <div className="text-center">
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
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Inc" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name. It can be your real name or a
                      pseudonym. You can only change this once every 30 days.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comapny  Email</FormLabel>
                    <FormControl>
                      <Input placeholder="invoice@acme.inc" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name. It can be your real name or a
                      pseudonym. You can only change this once every 30 days.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyMobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Mobile</FormLabel>
                    <FormControl>
                      <Input placeholder="1234567890" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name. It can be your real name or a
                      pseudonym. You can only change this once every 30 days.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Address</FormLabel>
                    <FormControl>
                      <Input placeholder="1600 Pennsylvania Avenue NW, Washington, DC 20500," {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name. It can be your real name or a
                      pseudonym. You can only change this once every 30 days.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
 
        </form>
      </Form>
    </div>
  )
}