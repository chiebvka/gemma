"use server"

import { profileLogoSchema, profileNameSchema, profileSchema } from "@/lib/validation/profile";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";



export async function updateSetup(context: z.infer<typeof profileSchema>){
    const supabase = createClient();
    try {
        const profile = profileSchema.parse(context);
        const { data, error } = await supabase
        .from("profiles")
        .update({
          companyEmail: profile.companyEmail,
          companyMobile: profile.companyMobile,
          companyAddress: profile.companyAddress,
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

export async function updateBusinessName(context: z.infer<typeof profileNameSchema>){
    const supabase = createClient();
    try {
        const profile = profileNameSchema.parse(context);
        const { data, error } = await supabase
        .from("profiles")
        .update({
          companyName: profile.companyName,
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

export async function updateBusinessLogo(context: z.infer<typeof profileLogoSchema>){
    const supabase = createClient();
    try {
        const profile = profileLogoSchema.parse(context);
        const { data, error } = await supabase
        .from("profiles")
        .update({
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