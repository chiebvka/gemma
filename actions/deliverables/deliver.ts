"use server"

import { completeDeliverable, deliverableOrder, deliverableSchema, deliverableTitleSchema, reorderDeliverablesSchema } from "@/lib/validation/deliverable";
import { createClient } from "@/utils/supabase/server";
import { Description } from "@radix-ui/react-toast";
import { z } from "zod";


export async function createDeliverable(context:z.infer<typeof deliverableTitleSchema>){
    const supabase = createClient();
    try {
        const deliverable = deliverableTitleSchema.parse(context); 
        const { data: { user }} = await supabase.auth.getUser();
        const { data, error} = await supabase
        .from("deliverables")
        .insert({
            title: deliverable.title,
            profile_id: user?.id,
            project_id: deliverable.project_id
        })
        .select()
        if(error){
            console.log(error);
            return null;
          }
          if (data.length > 0) {
            const createdDeliverable = data[0];
            console.log(createdDeliverable);
            return createdDeliverable;
        } else {
            console.log("No data returned");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }

}
export async function updatdeDeliverable(context:z.infer<typeof deliverableSchema>){
    const supabase = createClient();
    try {
        const deliverable = deliverableSchema.parse(context);
        const { data, error} = await supabase
        .from("deliverables")
        .update({
            id: deliverable.id,
            title: deliverable.title,
            description: deliverable.description,
            dueDate: deliverable.dueDate,
            position: deliverable.position,
            amount: deliverable.amount,
            project_id: deliverable.project_id
        })
        .select()
        if(error){
            console.log(error);
            return null;
          }
          if (data.length > 0) {
            const createdDeliverable = data[0];
            console.log(createdDeliverable);
            return createdDeliverable;
        } else {
            console.log("No data returned");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }

}


export async function deleteDeliverable(delivereableId: string){
    const supabase = createClient();
    try {
        const { data: { user }} = await supabase.auth.getUser();
        const { data, error} = await supabase
        .from("deliverables")
        .delete()
        .eq("id", delivereableId)
        .eq("profile_id", user?.id)

        

    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function fetchDeliverables(projectId: string){
    const supabase = createClient();
    try {
        const { data: { user }} = await supabase.auth.getUser();
        const { data, error} = await supabase
        .from("deliverables")
        .select("*")
        .eq("project_id", projectId)
        .eq("profile_id", user?.id)

        console.log(data)
        return data || []

    } catch (error) {
        console.log(error);
        return null;
    }
}


export async function reorderDeliverable(context:z.infer<typeof deliverableOrder>){
    const supabase = createClient();
    try {
        const deliverOrder = deliverableOrder.parse(context); 
        const { data: { user }} = await supabase.auth.getUser();
        const { data, error} = await supabase
              .from("deliverables")
              .update({ position: deliverOrder.position })
              .eq("id", deliverOrder.id)
              .eq("project_id", deliverOrder.project_id)
              .eq("profile_id",user?.id)
              .select()
            
              if(error){
                console.log(error);
                return null;
              }
              if (data.length > 0) {
                const reorderedDeliverable = data[0];
                console.log(reorderedDeliverable);
                return reorderedDeliverable;
            } else {
                console.log("No data returned");
                return null;
            }
      
    } catch (error) {
        console.log(error);
        return null;
    }
}


export async function completeDeliverables(context:z.infer<typeof completeDeliverable>){
    const supabase = createClient();
    try {
        const deliverableComplete = completeDeliverable.parse(context); 
        const { data: { user }} = await supabase.auth.getUser();
        const { data, error} = await supabase
        .from("deliverables")
        .update({
            isComplete: deliverableComplete.isComplete
        })
        .eq("id", deliverableComplete.id)
        .eq("project_id", deliverableComplete.project_id)
        .eq("profile_id",user?.id)
        .select()
      
        if(error){
          console.log(error);
          return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}


