"use server"
import { clientSchema } from "@/lib/validation/client";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";


export async function clientCreate(context:z.infer<typeof clientSchema>){
    const supabase = createClient();
    try {
        const client = clientSchema.parse(context);
        const { data: { user }} = await supabase.auth.getUser();
        const {data, error} = await supabase
        .from("clients")
        .insert({
            name: client.name,
            profile_id: user?.id,
            email: client.email,
            mobile: client.mobile,
            address: client.address
        })
        .select()
        if (error) {
            console.log(error);
            return null;
          }
          if (data.length > 0) {
            const createdClient = data[0];
            console.log(createdClient);
            return createdClient;
        } else {
            console.log("No data returned");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getclients(){
    const supabase = createClient();
    try {
        const { data: { user }} = await supabase.auth.getUser();
        const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("profile_id", user?.id)
        // console.log(data)
        return data || []


    } catch (error) {
        console.log(error);
        return null;
    }
}