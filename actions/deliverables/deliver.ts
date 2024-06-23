"use server"

import { deliverableSchema, deliverableTitleSchema } from "@/lib/validation/deliverable";
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