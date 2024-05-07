import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

export default function Logo({}: Props) {
  return (
    <Link href="/">
        <Image 
            height={130}
            width={130}
            alt='logo'
            src="/logo.svg"
        />
    </Link>
  )
}