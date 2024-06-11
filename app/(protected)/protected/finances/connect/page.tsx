import React from 'react'
import FinanceForm from '../_components/FinanceForm'
import { createClient } from '@/utils/supabase/server'
import { stripe } from '@/lib/stripe'
import EmptyProcessor from '../_components/EmptyProcessor'

type Props = {}

export default async function page({}: Props) {
    const supabase = createClient()
    const { data: { user }} = await supabase.auth.getUser()

    const { data: userDetails, error } = await supabase
    .from('profiles')
    .select('*')
    .match({id: user?.id})
    .single();
  
  
    console.log(userDetails)


  
  if (error) {
    console.log(error);
  }

  
   
  return (
    <div className='w-full'>
        <EmptyProcessor title="Connect Processor" description=" Hmmm, someone's not connected. Let's set you up with a processor to help process invoices, receipts and contracts "/>
        <FinanceForm userDetails={userDetails} />
    </div>
  )
}