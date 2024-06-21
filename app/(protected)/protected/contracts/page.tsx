import PageHeadings from '@/components/PageHeadings'
import React from 'react'
import DataTable from './_components/DataTable'
import { columns } from './_components/Column'

type Props = {}
type Payment = {
  id: string
  date: Date
  name: string
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

const data: Payment[] = [
  {
    id: "m5gr84i9",
    date:  new Date(2011, 10, 7),
    status: "success",
    name: "Kenny",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    date:  new Date(2012, 10, 24),
    status: "success",
    name: "Abe",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    date:  new Date(2008, 9, 24),
    status: "processing",
    name: "Monserrat",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    date:  new Date(2022, 11, 24),
    status: "success",
    name: "Silas",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
 date:  new Date(2023, 11, 24),
    status: "failed",
    name: "Carmel",
    email: "carmella@hotmail.com",
  },
]

export default function page({}: Props) {
  return (
    <div className="flex-1 w-full p-4 max-w-5xl mx-auto border-2 border-green-600 flex flex-col space-x-2 items-center">
      <PageHeadings title='Projects' description='Created Project' buttonLink='/protected/contracts/create' buttonTitle='Create Project' />
      <DataTable columns={columns} data={data? data : []} />
    </div>
  )
}