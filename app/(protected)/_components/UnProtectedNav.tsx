import Logo from '@/components/Logo'
import React from 'react'
import AvatarNav from './AvatarNav'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'


type Props = {}

export default async function UnProtectedNav({}: Props) {
    const supabase = createClient();
    const {
        data: { user },
      } = await supabase.auth.getUser();


  return (
    <div className='w-full'>
        <div className="w-full">
            <nav className="w-full flex max-w-6xl mx-auto justify-center border-2 border-primary rounded-lg h-16">
                <div className="w-full  flex justify-between items-center p-3 text-sm">
                {/* <DeployButton /> */}
                <Logo />
                {/* <DesktopNavbar /> */}
                {/* <AuthButton /> */}
                <div className='flex items-center space-x-3'>
                    <Link href="/pricing">
                        Pricing
                    </Link>
                    <Link href="/#testimonials" className='hidden md:flex'>
                        Testimonials
                    </Link>


                    {!user ? (
                    <Button>
                        <Link href="/login">
                            Get Started
                        </Link>
                    </Button>) :( <AvatarNav />)}

                    
                </div>
                </div>
            </nav>
        </div>
    </div>
  )
}