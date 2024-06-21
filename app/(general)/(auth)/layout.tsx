import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export default async function AuthLayout({children}: {
    children: React.ReactNode;
}) {
    const supabase = createClient();
    const { data: { user },} = await supabase.auth.getUser();

    user && redirect("/protected")
    return (
        <div>
            {children}
        </div>
    )
}