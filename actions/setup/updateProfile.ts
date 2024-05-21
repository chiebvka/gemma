"use server"

import { profileSchema } from "@/lib/validation/profile";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

export async function updateSetup(context: z.infer<typeof profileSchema>){
    const supabase = createClient();
    try {
        const profile = profileSchema.parse(context);
        const { data, error } = await supabase
        .from("profiles")
        .update({
          companyName: profile.companyName,
          companyEmail: profile.companyEmail,
          companyMobile: profile.companyMobile,
          companyAddress: profile.companyAddress,
          logoLink: profile.logoLink,
        })
        .eq("id", profile.id);
  
      if (error) {
        console.log(error);
        return false;
      }
      return true;
        
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.log(error);
            return false;
          }
          return false;
    }
}