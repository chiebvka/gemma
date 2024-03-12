import React from 'react'
import EmptyStates from '../../_components/EmptyStates'
import PageHeadings from '@/components/PageHeadings'
import FinanceForm from './_components/FinanceForm'
import CreateHeadings from '../../_components/CreateHeadings'




type Props = {}

let empty = true

export default function page({}: Props) {
  return (
    <div  className="flex-1 w-full p-4 max-w-5xl mx-auto border-2 border-green-600 flex flex-col space-x-2 items-center">
      {/* {empty == true ?
        <EmptyStates title="Unlinked" description="Seems like you haven't connected your payment method yet" buttonLink="/protected/invoices/create" imageSrc="/dashempty.png"  buttonTitle="Get Started" /> :
        <div></div>
      } */}
      
      <CreateHeadings title='Link Payment' description='Choose your payment method and connect your api keys to add them to your invoice'  />
      <div className=" w-full">
        <FinanceForm />
      </div>
    </div>
  )
}