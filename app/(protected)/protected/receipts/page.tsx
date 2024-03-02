import React from 'react'
import EmptyStates from '../../_components/EmptyStates'

type Props = {}

export default function page({}: Props) {
  return (
    <div  className="flex-1 w-full p-4 max-w-5xl mx-auto border-2 border-green-600 flex flex-col space-x-2 items-center">
    <EmptyStates title="Empty Data set" description="Seems like you haven't created any invoice or receipt yet" buttonLink="/protected/receipts/create" imageSrc="/dashempty.png"  buttonTitle="Get Started" />
</div>
  )
}