import Banner from '@/components/Banner'
import DesktopNavbar from '@/components/DesktopNavbar'
import Logo from '@/components/Logo'
import React from 'react'
import AvatarNav from './AvatarNav'

type Props = {}

export default function DesktopHeader({}: Props) {
  return (
    <div className=''>
      <div className="w-full">
        <Banner  label="Please select a invoice or recipt layout to go with." />
        {/* <div className="py-6 w-full font-bold bg-purple-950 text-center">
          This is a protected page that you can only see as an authenticated
          user
        </div> */}
        <nav className="w-full flex max-w-7xl mx-auto justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full  flex justify-between items-center p-3 text-sm">
            {/* <DeployButton /> */}
            <Logo />
            <DesktopNavbar />
            {/* <AuthButton /> */}
            <AvatarNav />
          </div>
        </nav>
      </div>
    </div>
  )
}