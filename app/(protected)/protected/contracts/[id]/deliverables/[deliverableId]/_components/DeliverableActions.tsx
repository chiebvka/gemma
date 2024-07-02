"use client"

import React, { useState }  from 'react';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"; 
  import { Loader2 as SpinnerIcon, Trash } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Button } from "@/components/ui/button";
import ConfirmModal from '@/components/modal/confirmModal';
import { deleteDeliverable } from '@/actions/deliverables/deliver';

type Props = {
    disabled: boolean;
    projectId: string;
    deliverableId: string;
    isComplete: boolean;
}

export default function DeliverableActions({disabled, projectId, deliverableId, isComplete}: Props) {
    const router = useRouter();
    const { toast } = useToast();
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    async function onClick(){ }

    async function onDelete(){
        setIsUpdating(true)

    }

  return (
    <div className="flex items-center gap-x-2">
        <Button
            disabled={disabled || isUpdating}
            variant="outline"
            size="sm"
        >
            {isComplete === false ? "In Progress" : "Completed"}
        </Button>
        <ConfirmModal onConfirm={() => {}}>
            <Button size="sm" disabled={isUpdating}>
                <Trash className="h-4 w-4" />
            </Button>
        </ConfirmModal>
    </div>
  )
}