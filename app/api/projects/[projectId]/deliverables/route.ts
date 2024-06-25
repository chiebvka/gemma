import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";


export async function POST(
    req: Request,
    { params }: { params: { projectId: string; } }
) {
    try {
        const supabase = createClient();
        const { data: { user }} = await supabase.auth.getUser();
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const {data: ownProject, error} = await supabase
        .from("deliverables")
        .select("*")
        // .eq("project_id", params.projectId)
        .eq("profile_id",user?.id)

        if (!ownProject) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

    } catch (error) {
        
    }
}