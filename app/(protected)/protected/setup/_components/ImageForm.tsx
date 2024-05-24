// "use client"

// import React, { useState } from 'react'
// import Image from 'next/image';
// import * as z from "zod";
// import { ImageIcon, Pencil, PlusCircle } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { Button } from "@/components/ui/button";
// import FileUpload from '@/components/FileUpload';
// import { Tables } from '@/types/supabase';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { createClient } from '@/utils/supabase/server';
// import { useToast } from '@/components/ui/use-toast';
// import { ProfileFormSchema } from '@/lib/validation/profile';
// import { profileConfig } from '@/config/profile';
// import { updateSetup } from '@/actions/setup/updateProfile';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';


// interface Props  {
//   userDetails: Profile
// }

// type Profile = Tables<'profiles'>;

// type ProfileFormValues = z.infer<typeof ProfileFormSchema>;

// interface ImageFormProps {
//     initialData: Profile;
//     logoLink: string
// }


// const formSchema = z.object({
//     logoLink: z.string().min(2, {
//       message: "Image is required",
//     }),
//   })
  

// export default function ImageForm({userDetails}: Props) {
//     const supabase = createClient();
//     const router = useRouter();
//     const { toast } = useToast();
//     const [isUpdating, setIsUpdating] = useState(false)

//     const toggleEdit = () => setIsUpdating((current) => !current)

//     const defaultValues: Partial<ProfileFormValues> = {
//       email: userDetails?.email || "",
//       companyName: userDetails?.companyName || "",
//       logoLink: userDetails?.logoLink || "",
//       companyEmail: userDetails?.companyEmail || "",
//       companyAddress: userDetails?.companyAddress || "",
//       companyMobile: userDetails?.companyMobile || "",
  
//   };

//   const form = useForm<ProfileFormValues>({
//     resolver: zodResolver(ProfileFormSchema),
//     defaultValues,
//     mode: "onChange",
// });

// async function onSubmit(data:ProfileFormValues){
//     setIsUpdating(true)
//     const response = await updateSetup({
//         id: userDetails.id,
//         companyName: data.companyName ?? '',
//         companyEmail: data.companyEmail ?? '',
//         companyMobile: data.companyMobile ?? '',
//         companyAddress: data.companyAddress ?? '',
//         logoLink: data.logoLink ?? '',
//     })    
//     if (response) {
//         toast({
//             title: "Success",
//             description: (profileConfig.successMessage),
//           })
//       } else {
//         toast({
//             variant: "destructive",
//             title: "Uh oh! Something went wrong.",
//             description: (profileConfig.errorMessage),
//           })
//       }
  
//       setIsUpdating(false);    
// }
    
//   return (
//     <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)}>
//             <FileUpload 
//               endpoint='imageUploader'
//               onChange={(url) => {
//                   if(url) {
//                       onSubmit({
//                         logoLink: '',
//                         email: '',
//                         companyName: '',
//                         companyEmail: ''
//                       })
//                   }
//               }}
//           />
//         </form>
//     </Form>
//   )
// }