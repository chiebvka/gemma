import React from 'react'

type Props = {}

export default function FinanceLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <div  className="flex-1 w-full border-2 border-red-600 p-4 max-w-5xl mx-auto  flex flex-col space-x-2 items-center">
        {children}
    </div>
  )
}