"use server"
import { projectDescriptionSchema, projectTitleSchema } from "@/lib/validation/project";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function projectTitle(context:z.infer<typeof projectTitleSchema>) {
    const supabase = createClient();
    try {
        const project = projectTitleSchema.parse(context);
        const { data: { user }} = await supabase.auth.getUser();
        const { data, error } = await supabase
        .from("projects")
        .insert({
            name: project.name,
            profile_id: user?.id
        })
        .select()
        // .single()
        if (error) {
            console.log(error);
            return null;
          }
          if (data.length > 0) {
            const insertedProject = data[0];
            console.log(insertedProject);
            return insertedProject;
        } else {
            console.log("No data returned");
            return null;
        }
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function updateProjectTitle(context:z.infer<typeof projectTitleSchema>){
    const supabase = createClient();
    try {
        const project = projectTitleSchema.parse(context);
        const { data: { user }} = await supabase.auth.getUser();
        console.log("Updating project with ID:", project?.id); // Log the project ID
        console.log("Updating project for user:", user?.id); 
        const { data, error } = await supabase
        .from("projects")
        .update({
            name: project.name
        })
        .eq("id",project?.id)
        .eq("profile_id",user?.id)
        .select()
        .single()

        return data 
        
        if (error) {
            console.log(error);
            return null;
          }
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function updateProjectDescription(context:z.infer<typeof projectDescriptionSchema>){
    const supabase = createClient();
    try {
        const project = projectDescriptionSchema.parse(context);
        const { data: { user }} = await supabase.auth.getUser();
        console.log("Updating project with ID:", project?.id); // Log the project ID
        console.log("Updating project for user:", user?.id); 
        const { data, error } = await supabase
        .from("projects")
        .update({
            description: project.description
        })
        .eq("id",project?.id)
        .eq("profile_id",user?.id)
        .select()
        .single()

        return data 
        
        // if (error) {
        //     console.log(error);
        //     return null;
        //   }
        
    } catch (error) {
        console.log(error);
        return null;
    }
}