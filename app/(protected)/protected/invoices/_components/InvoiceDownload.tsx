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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';



export default function InvoiceDownload() {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="secondary">Download Pdf</Button>
    </DialogTrigger>
    <DialogContent className="w-[90vw]">
      <DialogHeader>
        <DialogTitle>Invoice PDF Download</DialogTitle>
        <DialogDescription>
          Hi there let's get you that pdf version of this invoice. Just click below 
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button type="submit">Download</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}