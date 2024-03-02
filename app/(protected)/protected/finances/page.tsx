import React from 'react'
import EmptyStates from '../../_components/EmptyStates'

type Props = {}

let empty = true

export default function page({}: Props) {
  return (
    <div  className="flex-1 w-full p-4 max-w-5xl mx-auto border-2 border-green-600 flex flex-col space-x-2 items-center">
      {empty == true ?
        <EmptyStates title="Unlinked" description="Seems like you haven't connected your payment method yet" buttonLink="/protected/invoices/create" imageSrc="/dashempty.png"  buttonTitle="Get Started" /> :
        <div></div>
      }
    </div>
  )
}