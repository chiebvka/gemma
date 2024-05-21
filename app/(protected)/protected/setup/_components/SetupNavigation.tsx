'use client'

import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { setups } from '@/config';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface ExamplesNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SetupNavigation({ className, ...props }: ExamplesNavProps) {
    const pathname = usePathname()
  return (
    <nav className="flex md:flex-col overflow-x-scroll md:gap-4 text-sm  text-muted-foreground" x-chunk="dashboard-04-chunk-0">
              <ScrollArea className='max-w-[600px] lg:max-w-none'>
        <div className={cn("mb-4 flex md:flex-col ", className)} {...props}>
          {setups.map((example, index) => {
            return (
              <Link
                href={example.href}
                key={example.id}
                className={cn(
                  "flex  h-7 items-center   px-4 text-center rounded text-sm transition-colors hover:text-primary",
                  pathname == example.href ||
                    (index === 0 && pathname === "/protected/setup")
                    ? "bg-muted/85 font-medium border-2 border-black text-primary"
                    : "text-muted-foreground"
                )}
              >{example.name}</Link>
            )
          })}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
  </nav>
  )
}