"use server"
import { projectAmountSchema, projectClientSchema, projectDescriptionSchema, projectInvoiceSchema, projectInvoiceStatusSchema, projectNotificationSchema, projectTitleSchema } from "@/lib/validation/project";
import { createClient } from "@/utils/supabase/server";
import { equal } from "assert";
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


export async function getProjects(){
    const supabase = createClient();
    try {
        const {data: { user } } = await supabase.auth.getUser();

        const {data: project, error} = await supabase 
          .from("projects")
          .select(`
            *,
            client_id(id, name, email)
            `)
          .eq('profile_id', user?.id)

          return project

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
        

        
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function updateProjectClient(context: z.infer<typeof projectClientSchema>){
    const supabase = createClient();

        const project = projectClientSchema.parse(context);
        const { data: { user }} = await supabase.auth.getUser();
        const { data, error} = await supabase
        .from("projects")
        .update({
            client_id: project?.client_id
        })
        .eq("id", project?.id)
        .eq("profile_id", user?.id)


        return data

        
}

export async function updateProjectAmount(context: z.infer<typeof projectAmountSchema>){
    const supabase = createClient();

        const project = projectAmountSchema.parse(context);
        const { data: { user }} = await supabase.auth.getUser();
        console.log("Updating project with ID:", project?.id); // Log the project ID
        console.log("Updating project for user:", user?.id); 
        const { data, error } = await supabase
        .from("projects")
        .update({
            currency: project?.currency,
            amount: project?.amount
        })
        .eq("id", project?.id)
        .eq("profile_id", user?.id)

        return data

}

export async function deleteProject({ projectId }: { projectId: string }){
    const supabase = createClient();
    try {
        const { data: { user }} = await supabase.auth.getUser();
        const { data, error} = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId)
        .eq("profile_id", user?.id)

    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function projectNotificationComplete(context:z.infer<typeof projectNotificationSchema>){
    const supabase = createClient();

        const project = projectNotificationSchema.parse(context);
        const { data: { user }} = await supabase.auth.getUser();
        const { data, error} = await supabase
        .from("projects")
        .update({
            isDraft: project.isDraft,
            signature: project.signature
        })
        .eq("id", project?.id)
        .eq("profile_id", user?.id)

        return data
}

export async function projectInvoiceStatus(context:z.infer<typeof projectInvoiceStatusSchema>){
    const supabase = createClient();

    const project = projectInvoiceStatusSchema.parse(context);
    const { data: { user }} = await supabase.auth.getUser();



    const { data: currentProject, error: fetchError } = await supabase
        .from("projects")
        .select("issueInvoice")
        .eq("id", project.id)
        .eq("profile_id", user?.id)
        .single();

    if (fetchError) {
        console.log(fetchError);
        return null;
    }

    const previousIssueInvoice = currentProject?.issueInvoice;

    // Update the project issueInvoice field
    const { data, error } = await supabase
        .from("projects")
        .update({
            issueInvoice: project.issueInvoice
        })
        .eq("id", project.id)
        .eq("profile_id", user?.id)
        .select()
        .single();

    if (error) {
        console.log(error);
        return null;
    }

    // Check if the invoice needs to be created
    if (previousIssueInvoice === null && project.issueInvoice === true) {
        // Create a new invoice
        const { data: invoiceData, error: invoiceError } = await supabase
            .from("invoices")
            .insert({
                project_id: project.id,
                profile_id: user?.id,
            })
            .select()
            .single()

            // return invoiceData


            const { data: projectInvoice, error: projectInvoiceError } = await supabase
            .from("projects")
            .update({
                invoice_id: invoiceData?.id
            })
            .eq("id", project.id)
            .eq("profile_id", user?.id)
            .select()
            .single();


            if (projectInvoiceError) {
                console.log(projectInvoiceError);
                return null;
            }
            return invoiceData;
    }
    return data
}


export async function createProjectInvoice(context: z.infer<typeof projectInvoiceSchema>){
    const supabase = createClient();

        const project = projectInvoiceSchema.parse(context);
        const { data: { user }} = await supabase.auth.getUser();
        const { data, error} = await supabase
        .from("invoices")
        .insert({
            project_id: project.id,
            profile_id: user?.id
        })
        .select()
        // .single()

        console.log(data)
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