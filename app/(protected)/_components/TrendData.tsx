import { 
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
 } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { CircleDot, Link, ReceiptText, TicketCheck, TrendingDown, TrendingUp } from 'lucide-react'

import React from 'react'

type Props = {}

export default function TrendData({}: Props) {
  return (
    <div className='w-full flex  my-5 justify-center border-b border-b-foreground/10 '>
        <ScrollArea className=' w-full border-r-2 border-r-black'>
            <div className="flex  space-x-4" >
                <Card className='basis-1/3 flex-none md:basis-1/4'>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="md:text-sm text-xs font-medium">
                        Invoices Issued
                    </CardTitle>
                    <TicketCheck size={20} />
                    </CardHeader>
                    <CardContent>
                    <div className="md:text-2xl text-lg font-bold">99</div>
                    <span className="text-xs flex space-x-2 text-muted-foreground">
                        <TrendingDown size={16} />
                        <p>+20.1% from last month</p>
                    </span>
                    </CardContent>
                </Card>
                <Card className='basis-1/3 flex-none md:basis-1/4'>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="md:text-sm text-xs font-medium">
                        Receipts Issued
                    </CardTitle>
                    <ReceiptText size={20} />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">84</div>
                    <span className="text-xs flex space-x-2 text-muted-foreground">
                        <TrendingUp size={16} />
                        <p>+20.1% from last month</p>
                    </span>
                    </CardContent>
                </Card>
                <Card className='basis-1/3 flex-none md:basis-1/4'>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="md:text-sm text-xs  font-medium">
                        Pending Transactions
                    </CardTitle>
                    <CircleDot size={20} />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">231</div>
                    <span className="text-xs flex space-x-2 text-muted-foreground">
                        <TrendingDown size={16} />
                        <p>+20.1% from last month</p>
                    </span>
                    </CardContent>
                </Card>
                <Card className='basis-1/3 flex-none md:basis-1/4'>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="md:text-sm text-xs  font-medium">
                        Linked Payments 
                    </CardTitle>
                    <p className="relative h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                    </p>
                    {/* <Link size={20} /> */}
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">Linked</div>
                    <span className="text-xs flex space-x-2 text-muted-foreground">
                        <TrendingDown size={16} />
                        <p>+20.1% from last month</p>
                    </span>
                    </CardContent>
                </Card>
            </div>
            <ScrollBar orientation="horizontal" className="mt-3" />
        </ScrollArea>
    </div>
  )
}