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

        const {data: ownProject, error} = await supabase
        .from("deliverables")
        .select("*")
        .eq("project_id", params.projectId)
        .eq("profile_id",user?.id)

    
        if (!ownProject) {
            return new NextResponse("Unauthorized", { status: 401 });
        }


        for (let item of list) {
            await supabase
            .from("deliverables")
            .update({
                position: item.position
            })
            .eq("id", item.id)
        }

        return new NextResponse("Success", { status: 200 });

    } catch (error) {
        console.log("[REORDER]", error);
        return new NextResponse("Internal Error", { status: 500 }); 
    }
}