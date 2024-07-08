"use client"

import React, { useState }  from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Button } from "@/components/ui/button";
import ConfirmModal from '@/components/modal/ConfirmModal';
import { deleteProject } from '@/actions/projects/project';
import { projectConfig } from '@/config/project';
import { Trash } from 'lucide-react';

type Props = {
    projectId: string
    projectStatus: string
}

export default function ProjectActions({projectId, projectStatus}: Props) {
    const router = useRouter();
    const { toast } = useToast();
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    async function onDelete(){
        setIsUpdating(true)
        try {
            const response = await deleteProject({
                projectId: projectId
            })
            toast({
                variant: "success",
                title: "Success",
                description: (projectConfig.projectDeleteSuccess),
            })
            router.refresh();
            router.push(`/protected/contracts`);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: (projectConfig.projectDeleteError),
                })
        } finally {
            setIsUpdating(false);
            }
    }

  return (
    <div className="flex items-center justify-between rounded-lg bg-gradient-to-br from-[#f0f0f0] to-[#e0e0e0] shadow-lg px-4 py-2 border border-black max-w-max  gap-x-2">
    <div className="flex space-x-2 border-r border-zinc-600 pr-1">
        <div>
            {projectStatus === "started" ?  
               <div className="flex items-center gap-1">
               <div className="h-3 w-3 rounded-full bg-yellow-500 animate-pulse" />
               <div className="text-xs text-black">In Progress</div>
             </div>
           :    <div className="flex items-center gap-1">
           <div className="h-3 w-3 rounded-full bg-green-500" />
           <div className="text-xs text-emerald-700">Complete</div>
         </div> }
        </div>
    </div>
        <ConfirmModal onConfirm={onDelete}>
            <Button size="sm" variant="destructive" disabled={isUpdating}>
                <Trash className="h-4 w-4" />
                <span className="sr-only">Delete Deliverable</span>
            </Button>
        </ConfirmModal>
</div>
  )
}