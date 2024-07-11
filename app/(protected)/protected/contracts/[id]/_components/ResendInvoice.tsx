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

type Props = {}

export default function ResendInvoice({}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='text-xs md:text-sm'>Resend Invoice</Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw]">
        <DialogHeader>
          <DialogTitle>Invoice Resend</DialogTitle>
          <DialogDescription>
            Hi there look's like you're trying to send the resend the invoice for this project to the client just click the button below 
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Resend Invoice</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}