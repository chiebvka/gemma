"use client"

import { protectedNavLinks } from '@/config'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { ScrollBar } from './ui/scroll-area'

interface ExamplesNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function DesktopNavbar({ className, ...props }: ExamplesNavProps) {
  const pathname = usePathname()

  return (
    <div className='relative hidden md:flex border-2 '>
      <ScrollArea className='max-w-[600px] border-2 lg:max-w-none'>
        <div className={cn("mb-4 flex items-center", className)} {...props}>
          {protectedNavLinks.map((example, index) => {
            return (
              <Link
                href={example.links}
                key={example.links}
                className={cn(
                  "flex h-7 items-center justify-center  px-4 text-center rounded-full text-sm transition-colors hover:text-primary",
                  pathname == example.links ||
                    (index === 0 && pathname === "/protected")
                    ? "bg-muted font-medium text-primary"
                    : "text-muted-foreground"
                )}
              >{example.name}</Link>
            )
          })}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  )
}