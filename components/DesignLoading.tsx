import React from 'react'

type Props = {}

export default function DesignLoading({}: Props) {
  return (
    <div className='w-full'>
                <div className="border shadow rounded-md p-4 max-w-sm w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
                {/* <div className="rounded-full bg-slate-500 h-10 w-10"></div> */}
                <div className="flex-1 space-y-6 py-1">
                    <div className="flex space-y-3 flex-col pb-3 border-b">
                        <div className="h-2 w-4/12 bg-slate-500 rounded"></div>
                        <div className="h-2 w-8/12 bg-slate-500 rounded"></div>
                    </div>
                    <div className="space-y-5">
                        <div className="h-80 w-full bg-slate-500 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}