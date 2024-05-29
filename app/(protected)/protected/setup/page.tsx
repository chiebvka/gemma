
import React from 'react';
import CreateHeadings from '../../_components/CreateHeadings';
import SetupForm from './_components/SetupForm';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import SubscriptionSetupForm from './subscription/_components/SubscriptionSetupForm';
import { createClient } from '@/utils/supabase/server';
import ProfileSetupForm from './_components/ProfileSetupForm';
import ImageForm from './_components/ImageForm';
import { IconBadge } from '@/components/IconBadge';
import { FolderPen, LayoutDashboard } from 'lucide-react';
import BusinessNameForm from './_components/BusinessNameForm';
// import ImageForm from './_components/ImageForm';


type Props = {}

export default   async function page({}: Props) {
  const supabase = createClient();

  const {data: { user } } = await supabase.auth.getUser();

  const { data: userDetails, error } = await supabase
  .from('profiles')
  .select('*')
  .match({id: user?.id})
  .single();


  console.log(userDetails)

if (error) {
  console.log(error);
}




  return (
    <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div>
            <div className="flex items-center gap-x-2">

                <IconBadge icon={FolderPen} />
                <h2 className="text-xl">Business Details</h2>
            </div>
            <BusinessNameForm userDetails={userDetails} />
            <ImageForm userDetails={userDetails} />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Business Contact</h2>
            </div>
            <ProfileSetupForm userDetails={userDetails} />
          </div>
        {/* <ImageForm userDetails={userDetails} /> */}
        </div>
    </div>
  )
}