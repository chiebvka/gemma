import { createClient } from '@/utils/supabase/server';
import { ArrowLeft, CalendarDays, QrCode } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import DeliverableActions from './_components/DeliverableActions';
import { IconBadge } from '@/components/IconBadge';
import DeliverableTitle from './_components/DeliverableTitle';
import DeliverableDescription from './_components/DeliverableDescription';
import DeliverableDate from './_components/DeliverableDate';
import DeliverableSwitch from './_components/DeliverableSwitch';

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
    deliverabales?.due_date,
    deliverabales?.isComplete,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`

  const isComplete = deliverabales?.isComplete

  let projectsId = deliverabales?.project_id
  let delivereableId = deliverabales?.id

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
        <div className="flex  w-full items-center  justify-between">
          <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">
                    Deliverble Setup
                </h1>
                <span className='text-sm text-slate-700'>
                    Completed fields {completionText}
                </span>
          </div>
          <DeliverableActions 
            // disabled={false} 
            projectId={projectsId} 
            deliverableId={delivereableId} 
            isComplete={isComplete}            
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center space-x-2">
                <IconBadge icon={QrCode} />
                <h2 className="text-xl">Complete the deliverable details</h2>
              </div>
              <DeliverableTitle 
                initialData={deliverabales}
                id={params?.id}
                deliverableId={params?.deliverableId}
              />

              <DeliverableDescription 
                initialData={deliverabales}
                id={params?.id}
                deliverableId={params?.deliverableId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={CalendarDays} />
              <h2 className='text-xl'>Choose a due date</h2>
            </div>
            <DeliverableDate 
              initialData={deliverabales}
              id={params?.id}
              deliverableId={params?.deliverableId}
            />
            <DeliverableSwitch 
              initialData={deliverabales}
              id={params?.id}
              deliverableId={params?.deliverableId}
            />
          </div>
        </div>
      </div>
    </div>
  )
}