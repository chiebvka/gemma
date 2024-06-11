"use server";


import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function forgot(formData: FormData) {


    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const supabase = createClient();
    

    const { error } = await supabase.auth.resetPasswordForEmail(
        email,
            {
            redirectTo: `${origin}/reset-password`,
            },
      );


    if (error) {
      return redirect("/forgot-password?status=error");
    }

    return redirect("/forgot-password?status=success");
}
