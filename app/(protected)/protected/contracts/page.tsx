import PageHeadings from '@/components/PageHeadings'
import React from 'react'
import DataTable from './_components/DataTable'
import { columns } from './_components/Column'
import { getProjects } from '@/actions/projects/project'

type Props = {}
type Payment = {
  id: string
  date: Date
  name: string
  status: "pending" | "processing" | "success" | "failed"
  email: string
}


export default async function page({}: Props) {
  let data = await getProjects()
  console.log(data)

  return (
    <div className="flex-1 w-full p-4 max-w-5xl mx-auto border-2 border-green-600 flex flex-col space-x-2 items-center">
      <PageHeadings title='Projects' description='Created Project' buttonLink='/protected/contracts/create' buttonTitle='Create Project' />
      <DataTable columns={columns} data={data? data : []} />
    </div>
  )
}