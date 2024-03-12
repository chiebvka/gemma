
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'

type Props = {}

interface HeadingProps {
    title: string,
    description: string
}

export default function CreateHeadings({title, description}: HeadingProps) {

  return (
    <div className='w-full'>
        <div className='flex justify-between'>
        <div className="flex flex-col space-y-4">
            <h1 className='lg:text-3xl md:text-2xl text-lg  font-extrabold  '>{title}</h1>
            <p className='text-sm md:text-base'>{description} </p>
        </div>
        </div>
        <Separator className='my-2' />

  </div>
  )
}