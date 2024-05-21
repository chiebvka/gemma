import React from 'react';
import Link from 'next/link';
import { Fragment } from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

type Props = {
    text: string,
    href: string
}

export default function Breadcrumbs({text, href}: Props) {
  return (
        <Breadcrumb className="hidden md:items-start md:flex">
                    <BreadcrumbList >                        
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link 
                                    href='/protected/setup'
                                >
                                    Setup
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {/* <BreadcrumbSeparator /> */}
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link 
                                    href={`/protected/setup/${href}`}
                                >
                                    {text}
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>

        </Breadcrumb>
  )
}