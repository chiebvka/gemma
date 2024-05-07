import CreateHeadings from '@/app/(protected)/_components/CreateHeadings'
import PageHeadings from '@/components/PageHeadings'
import React from 'react'
import InvoiceForm from '../_components/InvoiceForm'

type Props = {}

export default function page({}: Props) {
  return (
    <div className="flex-1 w-full p-4 max-w-5xl mx-auto border-2 border-purple-600 flex flex-col space-x-2 items-center">
        <CreateHeadings title='Create Invoice' description="Let's create some invoices" />
        <InvoiceForm />
    </div>
  )
}