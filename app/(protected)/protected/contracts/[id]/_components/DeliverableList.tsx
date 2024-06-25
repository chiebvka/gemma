"use client"


import React, { useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "@hello-pangea/dnd";
import { cn } from '@/lib/utils';
import { Grip, Pencil } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tables } from '@/types/supabase';


type Deliverables = Tables<'deliverables'>;
type Project = Tables<'projects'>;

interface DeliverablesList {
  items: Deliverables[];
  onReorder: (updateData: {id: string; position: number}[]) => void;
  onEdit: (id: string) => void
}


type Props = {}

export default function DeliverableList({items, onReorder, onEdit}: DeliverablesList) {
  const [isMounted, setIsMounted] = useState(false);
  const [lists, setLists] = useState(items);


  useEffect(() => {
    setIsMounted(true)
}, []);

useEffect(() => {
  setLists(items)
}, [items])


const onDragEnd = (result: DropResult) => {
  if (!result.destination) return;

  const items = Array.from(lists);
  const [reorderedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderedItem);

  const startIndex = Math.min(result.source.index, result.destination.index);
  const endIndex = Math.max(result.source.index, result.destination.index);

  const updatedLists = items.slice(startIndex, endIndex + 1);

  setLists(items);

  const bulkUpdateData = updatedLists.map((list) => ({
    id: list.id,
    position: items.findIndex((item) => item.id === list.id)
  }));

  onReorder(bulkUpdateData);
} 


if(!isMounted) {
  return null;
}

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='lists'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {lists.map((list, index) => (
                <Draggable
                  key={list.id}
                  draggableId={list.id} 
                  index={index}
                >
                  {(provided) => (
                    <div
                      className={cn (
                        "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-3 text-sm",
                        list.isComplete && "bg-sky-100 border-sky-200 text-sky-700"
                      )}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                       <div
                            className={cn(
                                "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                                list.isComplete && "border-r-sky-200 hover:bg-sky-200"
                            )}
                            {...provided.dragHandleProps}
                        >
                            <Grip className='h-5 w-5' />
                        </div>
                        {list.title}
                        <div className='ml-auto pr-2 flex items-center gap-x-2'>    
                            <Badge className={cn(
                                "bg-slate-500",
                                list.isComplete && 
                                "bg-emerald-500"
                            )}>
                                {list.isComplete ? " Complete" : "In Progress"}
                            </Badge>
                            <Pencil 
                                onClick={() => onEdit(list.id)}
                                className='w-4 h-4 cursor-pointer hover:opacity-75 transition'
                              />
                        </div>
                    </div>

                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
    </DragDropContext>
  )
}