import React from 'react'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import Link from 'next/link'

interface HeadingProps {
    title: string,
    description: string,
    buttonTitle: string,
    buttonLink: string
}

export default function PageHeadings({title, description, buttonTitle, buttonLink}: HeadingProps) {
  return (
    <div className='w-full'>
      <div className='flex justify-between'>
        <div className="flex flex-col space-y-4 ">
            <h1 className='lg:text-3xl md:text-2xl text-lg  font-extrabold  '>{title}</h1>
            <p className='text-sm md:text-base'>{description} </p>
        </div>
        <Button asChild>
          <Link href={buttonLink}>{buttonTitle}</Link>
        </Button>
      </div>
        <Separator className='my-5' />
    </div>
  )
}