import React from 'react'
import EmptyStates from '../../_components/EmptyStates'
import TableLoading from '@/components/TableLoading'
import PageHeadings from '@/components/PageHeadings'
import DataTable from './_components/DataTable'
import { columns } from './_components/Column'

type Props = {}
let emptystate = true
type Payment = {
  id: string
  date: Date
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

const data: Payment[] = [
  {
    id: "m5gr84i9",
    date:  new Date(2011, 10, 7),
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    date:  new Date(2012, 10, 24),
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    date:  new Date(2008, 9, 24),
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    date:  new Date(2022, 11, 24),
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
 date:  new Date(2023, 11, 24),
    status: "failed",
    email: "carmella@hotmail.com",
  },
]



export default function page({}: Props) {
  return (
    <div  className="flex-1 w-full p-4 max-w-5xl mx-auto border-2 border-green-600 flex flex-col space-x-2 items-center">
      <TableLoading />
      {emptystate === false ? 
        <EmptyStates title="Empty Data set" description="Seems like you haven't created any invoice or receipt yet" buttonLink="/protected/receipts/create" imageSrc="/dashempty.png"  buttonTitle="Get Started" /> :
        <div className='w-full'>
        <PageHeadings title='Receipts' description='Here is a list of your paid invoices or you can create a receipt for an offline payment' buttonLink='/protected/receipts/create' buttonTitle='Create Receipt' />
        <DataTable columns={columns} data={data? data : []} />
      </div>
      }
</div>
  )
}