import React from 'react';
import { createClient } from '@/utils/supabase/server';
import NotFound from './not-found';
import { IconBadge } from '../../../../../components/IconBadge';
import {  ListChecks, QrCode, ArrowLeft } from 'lucide-react';
import TitleForm from './_components/TitleForm';
import DescriptionForm from './_components/DescriptionForm';
import ClientCard from './_components/ClientCard';
import Link from 'next/link';
import { getclients } from '@/actions/clients/client';
import DeliverablesForm from './_components/DeliverablesForm';
import { fetchDeliverables } from '@/actions/deliverables/deliver';
import ProjectActions from './_components/ProjectActions';
import ProjectAmount from './_components/ProjectAmount';
import TrackingCard from './_components/TrackingCard';
import IssueInvoice from './_components/IssueInvoice';

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
    .select(`
      *,
      client_id(id, name, email)
      `)
    .eq('profile_id', user?.id)
    .eq( 'id', params?.id)
    .single()

    // console.log(project)

    const projectId = project?.id
    // const projectStatus = project?.status
    
    if (error || !project) {
      return <NotFound />;
    }

    let clients  = await getclients()
    clients = clients || []
    // console.log(clients)

    let deliverables  = await fetchDeliverables(project?.id)
    deliverables = deliverables || []
    // console.log(deliverables)

    const requiredFields = [
      project?.name,
      project?.description,
      project?.currency,
      project?.amount,
      project?.isDraft,
      project?.signature,
      
    ]

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length

    // console.log(totalFields)
    // console.log(completedFields)

    const completionTexts = `(${completedFields}/${totalFields})`

    const projectStatus = requiredFields.every(Boolean);
    console.log(projectStatus)

  return (
    <div className="flex-1 w-full p-4 max-w-5xl mx-auto flex flex-col space-x-2 items-center">
      <div className="w-full">
        <div className=" w-full items-center ">
        <Link 
              href={`/protected/contracts`}
              className='flex items-center text-sm hover:opacity-75 transition mb-6'
            >
              <ArrowLeft className='h-4 w-4 mr-2' />
              Back to projects list
        </Link>
        <div className="flex flex-col md:flex-row  w-full items-center  justify-between">
          <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">
                    Project Setup
                </h1>
                <span className='text-sm text-slate-700'>
                    Completed fields {completionTexts}
                </span>
          </div>
          <ProjectActions
            projectId={projectId}
            projectStatus={projectStatus}
          />
        </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={QrCode} />
                <h2 className="text-xl">Project Details</h2>
              </div>
              <TitleForm 
                initialData={project}
                id={project.id}
              />
              <ClientCard 
                initialData={project}
                clients={clients}
              />
              <DescriptionForm 
                initialData={project}
                id={project.id}
              />

              
              <IssueInvoice 
                initialData={project}
                id={project.id}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Project Deliverables</h2>
              </div>
            </div>
            <DeliverablesForm
              projectData={project}
              deliverableData={deliverables}
              projectId={project.id}
            />
            <ProjectAmount
              initialData={project}
              id={project.id}
            />
            <TrackingCard 
              initialData={project}
              id={project.id}
            />
          </div>
        </div>
      </div>
    </div>
  )
}