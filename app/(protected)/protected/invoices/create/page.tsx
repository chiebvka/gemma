import CreateHeadings from '@/app/(protected)/_components/CreateHeadings'
import PageHeadings from '@/components/PageHeadings'
import React from 'react'
import InvoiceForm from '../_components/InvoiceForm'
import { fetchUser } from '@/actions/setup/updateProfile'

type Props = {}

export default async function page({}: Props) {

  let profile = await fetchUser()


  return (
    <div className="flex-1 w-full p-4 max-w-5xl mx-auto border-2 border-purple-600 flex flex-col space-x-2 items-center">
        <CreateHeadings title='Create Invoice' description="Let's create some invoices" />
        <InvoiceForm profile={profile}  />
    </div>
  )
}

