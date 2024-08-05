import CreateHeadings from '@/app/(protected)/_components/CreateHeadings'
import React from 'react'
import EditInvoiceForm from './_components/EditInvoiceForm'

type Props = {}

export default function page({}: Props) {
  
  return (
    <div  className="flex-1 w-full p-4 max-w-5xl mx-auto border-2 border-purple-600 flex flex-col space-x-2 items-center">
      <CreateHeadings title='Invoice Details' description='Here are the ivoice details' />
      <EditInvoiceForm />
    </div>
  )
}