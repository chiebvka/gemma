import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import Link from 'next/link'
import React from 'react'
import InvoiceDownload from '../protected/invoices/_components/InvoiceDownload'
import InvoicePreview from '../protected/invoices/_components/InvoicePreview'
import InvoiceShare from '../protected/invoices/_components/InvoiceShare';

type Props = {}

interface HeadingProps {
    title: string,

}

export default function CreateHeadings({title}: HeadingProps) {
  return (
    <div className='w-full'>
        <div className='flex justify-between'>
        <div className="flex flex-col space-y-4 ">
            <h1 className='lg:text-3xl md:text-2xl text-lg  font-extrabold  '>{title}</h1>
        </div>
        </div>
        <Separator className='my-2' />
        <div className="flex flex-col space-y-2 md:flex-row w-full items-start  justify-between">
            <div className="flex md:flex-col w-full md:justify-start ml-auto items-center md:items-start justify-center my-auto  space-x-3 space-y-3 ">
                <div className="flex  items-center  space-x-2">
                    <Switch id="functional" defaultChecked />
                    <Label htmlFor="functional" className="flex flex-col space-y-1">
                        <span className="font-normal leading-snug text-muted-foreground">
                            Use default design
                        </span>
                    </Label>
                </div>
                <div className="">
                    <Button disabled>
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
  </div>
  )
}