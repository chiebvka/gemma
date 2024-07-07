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
import { clsx } from 'clsx';


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
  
  console.log("Bulk update data:", bulkUpdateData); 
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
                        "flex items-center gap-x-2 bg-white/70 hover:border-sky-200  border text-slate-700 rounded-lg mb-3 text-sm",
                        list.isComplete && "bg-gradient-to-br from-[#e0f0e0] to-[#c0e0c0]  "
                      )}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                       <div
                            className={cn(
                                "grid gap-2  w-full p-4 rounded-md shadow-md transition",
                                list.isComplete && "bg-gradient-to-br from-[#e0f0e0] to-[#c0e0c0] hover:bg-sky-200"
                            )}
                            {...provided.dragHandleProps}
                        >
                            {/* <Grip className='h-5 w-5' /> */}
                        <div className="flex items-center justify-between space-y-2">
                          <span  className="text-sm font-medium">
                            {list.title}
                          </span>
                          <div className='ml-auto pr-2 flex items-center gap-x-2'>    
                            <span className='border-r pr-2'>
                                {list.isComplete ? <div className="flex items-center gap-1">
                                  <div className="h-3 w-3 rounded-full bg-green-500" />
                                  <div className="text-xs text-emerald-700">Complete</div>
                                </div> :       <div className="flex items-center gap-1">
                                      <div className="h-3 w-3 rounded-full bg-yellow-500 animate-pulse" />
                                      <div className="text-xs text-black">In Progress</div>
                                    </div>}
                            </span>
                            <div 
                              onClick={() => onEdit(list.id)} 
                              className='flex items-center space-x-1 cursor-pointer hover:opacity-75 transition'>
                              <Pencil 
                                  
                                  className='w-3 h-3 '
                                />
                                <span className="text-xs">
                                  Edit
                                </span>
                            </div>
                          </div>
                        </div>
                          <p className='text-xs text-muted-foreground line-clamp-2'>

                          {list.description}
                          </p>
               
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