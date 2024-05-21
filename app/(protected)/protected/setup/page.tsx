
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
        <div className="grid gap-6">
        <ProfileSetupForm userDetails={userDetails} />
        </div>
    </div>
  )
}