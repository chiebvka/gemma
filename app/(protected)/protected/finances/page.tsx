import React from 'react'
import EmptyStates from '../../_components/EmptyStates'
import PageHeadings from '@/components/PageHeadings'
import FinanceForm from './_components/FinanceForm'
import CreateHeadings from '../../_components/CreateHeadings'
import { createClient } from '@/utils/supabase/server'
import { stripe } from '@/lib/stripe'
import EmptyProcessor from './_components/EmptyProcessor'
import ProcessorForm from '../setup/processor/_components/ProcessorForm'




type Props = {}



let empty = true

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
      <div className=" w-full">
      {empty == true ?
        <EmptyStates title="Link Payment" description="Seems like you haven't connected your payment method yet" buttonLink="/protected/finances/connect" imageSrc="/dashempty.png"  buttonTitle="Connect Processor" /> :
        <div></div>
      }
      {/* <CreateHeadings title='Link Payment' description='Choose your payment method and connect your api keys to add them to your invoice'  /> */}
        <EmptyProcessor title='Processor Connected' description="Looks like you're all setup on the processor side of things" />
        <div className='w-full md:w-10/12 mx-auto'>
          <ProcessorForm />
        </div>
        {/* <FinanceForm userDetails={userDetails} /> */}
      </div>
  )
}