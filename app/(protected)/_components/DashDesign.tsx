import React from 'react';
import Link from 'next/link';
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import Image from 'next/image';

type Props = {}

interface DesignProps {
    title: string,
    description: string,
    imageSrc: string,
    designLink: string
}

export default function DashDesign({title, description, imageSrc, designLink}: DesignProps) {
  return (
    <Link href="/protected/invoices">
        <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className='border-2 border-primary m-3 rounded-lg '>
            <Image 
                src={imageSrc}
                alt={title}
                width={500}
                height={500}
            />
          </CardContent>
        </Card>
    </Link>
  )
}