import React from 'react'

type Props = {}

export default function TableLoading({}: Props) {
  return (
    <div className='w-full'>
             <div className="border shadow rounded-md p-4 max-w-5xl w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
                {/* <div className="rounded-full bg-slate-500 h-10 w-10"></div> */}
                <div className="flex-1 space-y-6 py-1">
                    <div className="grid space-y-3 flex-col grid-cols-6 pb-3 border-b">
                        <div className="col-span-5 space-y-3">
                            <div className="h-4 w-4/12 bg-slate-500 rounded"></div>
                            <div className="h-4 w-8/12 bg-slate-500 rounded"></div>
                        </div>
                        <div className="col-span-1">
                            <div className="h-8 bg-slate-500 rounded"></div>
                        </div>
                    </div>
                    <div className="space-y-5 ">
                        <div className="grid grid-cols-6 my-5 gap-4">
                            <div className="flex h-4 bg-slate-500 rounded col-span-1 my-auto"></div>
                            <div className="flex col-span-4 w-full flex-col space-y-3">
                                <div className="h-4 bg-slate-500 rounded"></div>
                            </div>
                            <div className="h-4 bg-slate-500 my-auto rounded col-span-1"></div>
                        </div>
                        <div className="grid grid-cols-6 my-5 gap-4">
                            <div className="flex h-4 bg-slate-500 rounded col-span-1 my-auto"></div>
                            <div className="flex col-span-4 w-full flex-col space-y-3">
                                <div className="h-4 bg-slate-500 rounded"></div>
                            </div>
                            <div className="h-4 bg-slate-500 my-auto rounded col-span-1"></div>
                        </div>
                        <div className="grid grid-cols-6 my-5 gap-4">
                            <div className="flex h-4 bg-slate-500 rounded col-span-1 my-auto"></div>
                            <div className="flex col-span-4 w-full flex-col space-y-3">
                                <div className="h-4 bg-slate-500 rounded"></div>
                            </div>
                            <div className="h-4 bg-slate-500 my-auto rounded col-span-1"></div>
                        </div>
                        <div className="grid grid-cols-6 my-5 gap-4">
                            <div className="flex h-4 bg-slate-500 rounded col-span-1 my-auto"></div>
                            <div className="flex col-span-4 w-full flex-col space-y-3">
                                <div className="h-4 bg-slate-500 rounded"></div>
                            </div>
                            <div className="h-4 bg-slate-500 my-auto rounded col-span-1"></div>
                        </div>
                        <div className="grid grid-cols-6 my-5 gap-4">
                            <div className="flex h-4 bg-slate-500 rounded col-span-1 my-auto"></div>
                            <div className="flex col-span-4 w-full flex-col space-y-3">
                                <div className="h-4 bg-slate-500 rounded"></div>
                            </div>
                            <div className="h-4 bg-slate-500 my-auto rounded col-span-1"></div>
                        </div>
                        <div className="grid grid-cols-6 my-5 gap-4">
                            <div className="flex h-4 bg-slate-500 rounded col-span-1 my-auto"></div>
                            <div className="flex col-span-4 w-full flex-col space-y-3">
                                <div className="h-4 bg-slate-500 rounded"></div>
                            </div>
                            <div className="h-4 bg-slate-500 my-auto rounded col-span-1"></div>
                        </div>
                        <div className="grid grid-cols-6 my-5 gap-4">
                            <div className="flex h-4 bg-slate-500 rounded col-span-1 my-auto"></div>
                            <div className="flex col-span-4 w-full flex-col space-y-3">
                                <div className="h-4 bg-slate-500 rounded"></div>
                            </div>
                            <div className="h-4 bg-slate-500 my-auto rounded col-span-1"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}