"use client"


import React from 'react'
import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'
import { Icons } from '@/components/icons'

type Props = {}



export default function LoginButton({}: Props) {

    const {pending} = useFormStatus()

  return (
    <Button  type="submit">
          {pending ?  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : "Login"}
    </Button>
  )
}