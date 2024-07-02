import React from 'react';
import { createClient } from '@/utils/supabase/server';
import NotFound from './not-found';
import { IconBadge } from '../../../../../components/IconBadge';
import { FolderPen } from 'lucide-react';
import TitleForm from './_components/TitleForm';
import DescriptionForm from './_components/DescriptionForm';
import ClientCard from './_components/ClientCard';
import { getclients } from '@/actions/clients/client';
import DeliverablesForm from './_components/DeliverablesForm';
import { fetchDeliverables } from '@/actions/deliverables/deliver';

type Props = {
  params: {
    id: string;
  };
}

export default async function page({params}: Props) {
  const supabase = createClient();
  const {data: { user } } = await supabase.auth.getUser();

  const {data: project, error} = await supabase 
    .from("projects")
    .select("*")
    .eq('profile_id', user?.id)
    .eq( 'id', params?.id)
    .single()

    console.log(project)
    
    if (error || !project) {
      return <NotFound />;
    }

    let clients  = await getclients()
    clients = clients || []
    console.log(clients)

    let deliverables  = await fetchDeliverables(project?.id)
    deliverables = deliverables || []
    // console.log(deliverables)

    const requiredFields = [
      project?.name,
      project?.description,
      project?.currency,
      project?.amount,
      project?.start_date,
      project?.due_date,
      project?.deliverable_id
    ]

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length

    console.log(totalFields)
    console.log(completedFields)

    const completionTexts = `(${completedFields}/${totalFields})`

    const isComplete = requiredFields.every(Boolean);

  return (
    <div className="flex-1 w-full p-4 max-w-5xl mx-auto border-2 border-green-600 flex flex-col space-x-2 items-center">
        <div className="flex flex-col w-full items-center border-2 border-black justify-between">
          <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">
                  Course Setup
              </h1>
              <span className='text-sm text-slate-700'>
                  Complete all fields {completionTexts}
              </span>
          </div>
          {/** ADD ACTIONS */}
          {/* <Actions
              disabled={!isComplete}
              courseId={params.courseId}
              isPublished={course.isPublished}
          /> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={FolderPen} />
                <h2 className="text-xl">Customize your course</h2>
              </div>
              <TitleForm 
                initialData={project}
                id={project.id}
              />
              <ClientCard 
                clients={clients}
              />
              <DescriptionForm 
                initialData={project}
                id={project.id}
              />
              <TitleForm 
                initialData={project}
                id={project.id}
              />
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={FolderPen} />
                  <h2 className="text-xl">Customize your course</h2>
                </div>
              </div>
              <DeliverablesForm
                projectData={project}
                deliverableData={deliverables}
                projectId={project.id}
              />
            </div>
          </div>
        </div>
    </div>
  )
}