import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from  '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

type Props = {}

export default function InvoicePreview({}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Preview</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[90vw] max-w-[90vw]">
        <DialogHeader>
          <DialogTitle>Invoice Preview</DialogTitle>
          <DialogDescription>
            You get to see a preview of the invoice when sent via mail and the pdf version.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="flex  flex-col w-full ">
              <h2 className='text-lg font-bold text-center my-3'>Email Preview</h2>
              <div className="rounded-md flex w-full bg-slate-200 p-6">
          
                  {/* <code className="grid gap-1 text-sm text-muted-foreground [&_span]:h-4"> */}
                  <code className="flex flex-col text-sm w-full space-y-3 text-muted-foreground ">
                  <span className='flex items-center justify-center'>
                      <span className="text-black text-md text-center">logoipsum</span> 
                  </span>
                  <span>
                      <span className="text-indigo-600 text-xl">Heyy, you've got Invoice!!!</span> 
                  </span>
                  <span />
                  <span>
                      Hi there, <br />

                      Your invoice from [Your Company Name] is 
                      ready for payment. Please review the attached invoice 
                      and make the payment at your earliest convenience.
                  </span>
                  <span>
                      Invoice Number: [Invoice Number] <br />
                      Invoice Issue Date: [Invoice Date] <br />
                      Due Date: [Due Date] <br />
                      Amount Due: [Amount]
                  </span>
                  <span>Feel free to download or print right <Link href="/protected/invoices/create" className='text-indigo-600'>here</Link>  </span>
                  <span />
                  </code>
          
              </div>
          </div>
          <div className=''>
              <h2 className='text-lg font-bold text-center my-3'>Pdf Preview</h2>
              <Image src="/dashempty.png" width={500} height={500} alt="Invoice PDF" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}