import CreateHeadings from '@/app/(protected)/_components/CreateHeadings'
import React from 'react'
import ReceiptForms from '../_components/ReceiptForms';

type Props = {}

export default function page({}: Props) {
  return (
    <div className='flex-1 w-full p-4 max-w-5xl mx-auto border-2 border-green-600 flex flex-col space-x-2 items-center'>
        <CreateHeadings title='Create Receipt' />
        <ReceiptForms />
    </div>
  )
}