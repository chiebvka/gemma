"use client"
import React from 'react';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table"
   
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowDownUp, ChevronDown, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

type Invoice = {
    id: string
    created_at: Date
    state: "pending" | "processing" | "success" | "failed"
    recepientEmail: string
    totalAmount: number
  }

const dates = new Date()
console.log(dates.toDateString())

type Props = {}

export const columns: ColumnDef<Invoice>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "state",
    header: "Status",
  
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("state")}</div>
    ),
  },
  {
    accessorKey: "recepientEmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Client Email
    
          <ArrowDownUp className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("recepientEmail")}</div>,
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Invoice Amount
          {/* <ArrowDownUp className="ml-2 h-4 w-4" /> */}
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("totalAmount")}</div>,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <div
          className='text-right flex items-end justify-end cursor-pointer'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Issued
          <ArrowDownUp className="ml-2 h-4 w-4" />
        </div>
      )
    },
    // header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const dateValue = row.getValue("created_at") as Date;
      const formattedDate = format(dateValue, "PPP")
      // const amount = parseFloat(row.getValue("amount"))
 
      // Format the amount as a dollar amount
      // const formatted = new Intl.NumberFormat("en-US", {
      //   style: "currency",
      //   currency: "USD",
      // }).format(amount)
 
      return <div className="text-right font-medium">{formattedDate}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const invoice = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
              {/* <MoreHorizontal /> */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(invoice.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/protected/invoices/${invoice.id}`}>Edit Project</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]