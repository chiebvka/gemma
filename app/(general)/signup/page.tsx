import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LoginForm from '../login/_components/LoginForm'
import SignupForm from './_components/SignupForm'

type Props = {}

export default function page({}: Props) {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-balance text-muted-foreground">Enter your email below to create an account</p>
        </div>

        <SignupForm />

        <div className="mt-4 text-center text-sm">
          Have an account?
          <Link className="underline" href="/login">
            Login 
          </Link>
        </div>
      </div>
    </div>
    <div className="hidden bg-muted lg:block">
      <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
    </div>
  </div>
  )
}