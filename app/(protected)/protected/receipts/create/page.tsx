import CreateHeadings from '@/app/(protected)/_components/CreateHeadings'
import React from 'react'
import ReceiptForms from '../_components/ReceiptForms';

type Props = {}

export default function page({}: Props) {
  return (
    <div className='flex-1 w-full p-4 max-w-5xl mx-auto border rounded-lg shadow-xl my-3 flex flex-col space-x-2 items-center'>
        <CreateHeadings title='Create Receipt' description="Let's create receipts for those offline transactions" />
        <div className="flex space-x-2" >
          <ReceiptForms />
        </div>
    </div>
  )
}