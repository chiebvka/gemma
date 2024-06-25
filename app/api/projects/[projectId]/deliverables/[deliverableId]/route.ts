import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";


export async function PATCH(
    req:Request, 
    { params }: { params: { projectId: string; deliverableId: string } } ) {
        const supabase = createClient();
        try {
            const { data: { user }} = await supabase.auth.getUser();
            if (!user) {
                return new NextResponse("Unauthorized", { status: 401 });
              }
            
              const { data: fetchDeliverables, error} = await supabase
              .from("deliverables")
              .select("*")
              .eq("project_id", params.projectId)
              .eq("profile_id", user?.id)

              if (!fetchDeliverables) {
                return new NextResponse("Unauthorized", { status: 401 });
              }

              

        } catch (error) {
            
        }
}