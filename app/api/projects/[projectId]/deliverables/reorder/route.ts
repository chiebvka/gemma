import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params }: { params: { projectId: string; } }
) {
    try {
        const supabase = createClient();
        const { data: { user }} = await supabase.auth.getUser();
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { list } = await req.json();
        console.log("Received list:", list);


        for (let item of list) {
            await supabase
            .from("deliverables")
            .update({
                position: item.position
            })
            .eq("id", item.id)
            .eq("project_id", params.projectId)
            .eq("profile_id",user?.id)
        }

        const {data: ownProject, error} = await supabase
        .from("deliverables")
        .select("*")
        .eq("project_id", params.projectId)
        .eq("profile_id",user?.id)

    
        if (!ownProject) {
            return new NextResponse("Unauthorized", { status: 401 });
        }


        // const updatePromises = list.map(async (item: { id: string; position: number }) => {
        //     const { data, error } = await supabase
        //         .from("deliverables")
        //         .update({ position: item.position })
        //         .eq("id", item.id)
        //         .eq("project_id", params.projectId)
        //         .eq("profile_id", user?.id);

        //     if (error) {
        //         console.log("Error updating deliverable:", error);
        //         throw error;
        //     }
        // });

        // await Promise.all(updatePromises);




        return new NextResponse("Success", { status: 200 });

    } catch (error) {
        console.log("[REORDER]", error);
        return new NextResponse("Internal Error", { status: 500 }); 
    }
}