import { createClient } from "@/utils/supabase/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 


const f = createUploadthing();
 
// const auth = async(req: Request) => {
//   const {data, error} = await supabase.auth.getSession()
//   if (error || !data.session) {
//     throw new UploadThingError("Unauthorized");
//   }
//   return { id: data.session.user.id };
 // Fake auth function
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      const supabase = createClient();
      const {data: {user}, error} = await supabase.auth.getUser()
      console.log(user)
 
      // If you throw, the user will not be able to upload
    
      if (!user) throw new UploadThingError("Unauthorized");

 
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
 
      console.log("file url", file.url);
 
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
  
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;