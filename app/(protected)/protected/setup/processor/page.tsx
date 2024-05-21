import React from 'react'
import ProcessorForm from './_components/ProcessorForm';

type Props = {}

export default function page({}: Props) {
  return (
    <div className="w-full">
      <div className="grid gap-6">
        <ProcessorForm />
      </div>
    </div>
  )
}