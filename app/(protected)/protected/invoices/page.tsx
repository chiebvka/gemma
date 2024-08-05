import React from 'react'
import EmptyStates from '../../_components/EmptyStates'
import DataTable from './_components/DataTable'
import { columns } from './_components/Column'
import PageHeadings from '../../../../components/PageHeadings';
import TableLoading from '@/components/TableLoading';
import { getIssuedInvoices } from '@/actions/invoice/invoices';

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

export default async function page({}: Props) {

  let data = await getIssuedInvoices()
  console.log(data)

  return (
    <div  className="flex-1 w-full p-4 max-w-5xl mx-auto border-2 border-green-600 flex flex-col space-x-2 items-center">
      <TableLoading />
      {emptystate === false ?
        <EmptyStates title="Unlinked" description="Seems like you haven't connected your payment method yet" buttonLink="/protected/invoices/create" imageSrc="/dashempty.png"  buttonTitle="Get Started" /> :
        <div className='w-full'>
          <PageHeadings title='Invoices' description='Created Invoices' buttonLink='/protected/invoices/create' buttonTitle='Create Invoice' />
          <DataTable columns={columns} data={data? data : []} />
        </div>
      }
    </div>
  )
}