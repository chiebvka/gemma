

import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import Link from 'next/link';


export default function Steps({
    title,
    stepLink,
    children,
  }: {
    title: string,
    stepLink: string,
    children: React.ReactNode;
  }) {

  return (
    <>
        <li className="mx-4 w-full list-none border-2 border-black shadow-lg rounded-lg p-3">
            <Link href={stepLink}>
                <input type="checkbox" id={title} className="mr-2 peer bg-black" />
                <label
                htmlFor=""
                className={`text-lg text-foreground/90 peer-checked:line-through font-semibold hover:cursor-pointer`}
                >
                {title}
                </label>
                <div
                className={`mx-6 text-foreground/80 text-sm peer-checked:line-through`}
                >
                    {children}
                </div>
            </Link>
        </li>
    </>
  )
}