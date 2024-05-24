import { createClient } from "@/utils/supabase/server";
import { redirect } from 'next/navigation';
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
const supabase = createClient();

 
const handleAuth = async () => {
    try { 
        const { data: { user },} = await supabase.auth.getUser();
          if (!user) {
             redirect("/login");
             return{ success: false}
          }
          return{ success: true}
    } catch (error) {
        throw new Error("Unauthorized");
    }
    
} // Fake auth function
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1, } })
    // Set permissions and file types for this FileRoute
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;