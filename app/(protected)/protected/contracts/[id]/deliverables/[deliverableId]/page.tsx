import { createClient } from '@/utils/supabase/server';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import DeliverableActions from './_components/DeliverableActions';

type Props = {
  params: {
    id: string;
    deliverableId: string
  };
}

export default async function page({params}: Props) {
  const supabase = createClient();
  const {data: { user } } = await supabase.auth.getUser();

  const {data: deliverabales, error} = await supabase
  .from("deliverables")
  .select("*")
  .eq("id", params?.deliverableId)
  .eq("project_id", params?.id)
  .eq('profile_id', user?.id)
  .single()

  console.log(params?.id)

  console.log(deliverabales)

  const requiredFields = [
    deliverabales?.title,
    deliverabales?.description,
    deliverabales?.tasks,
    deliverabales?.due_date,
    deliverabales?.amount_due,

  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`

  const isComplete = requiredFields.every(Boolean);

  return (
    <div  className="flex-1 w-full p-4 max-w-5xl mx-auto border-2 border-green-600 flex flex-col space-x-2 items-center">
      <div className="w-full">
        <Link 
              href={`/protected/contracts/${params?.id}`}
              className='flex items-center text-sm hover:opacity-75 transition mb-6'
            >
              <ArrowLeft className='h-4 w-4 mr-2' />
              Back to project setup
        </Link>
        <div className="flex  w-full items-center border-2 border-black justify-between">
          <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">
                    Course Setup
                </h1>
                <span className='text-sm text-slate-700'>
                    Complete all fields {completionText}
                </span>
          </div>
          <DeliverableActions 
            disabled={false} 
            projectId={''} 
            deliverableId={''} 
            isComplete={false}            
          />
        </div>
      </div>
    </div>
  )
}