"use client"
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import React from 'react'


interface headinProps {
    title: string,
    description: string,
    buttonTitle: string,
    buttonLink: string,
    imageSrc: string
}

export default function EmptyStates({title, description, buttonTitle, imageSrc, buttonLink}: headinProps) {
  return (
    <div className='w-full'>
        <div className='flex justify-between'>
        <div className="flex flex-col space-y-4 ">
            <h1 className='lg:text-3xl md:text-2xl text-lg  font-extrabold  '>{title}</h1>
        </div>
        <Button asChild>
            <Link href={buttonLink}>{buttonTitle}</Link>
        </Button>
        </div>
            <p className='text-sm my-3 md:text-base'>{description} </p>
        <Separator className='my-5' />
        <div className="h-96 border-2 border-dashed border-palette">
            <img src={imageSrc} alt="" className="object-contain w-full h-full" />
        </div>
    </div>
  )
}