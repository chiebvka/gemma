import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { createClient } from '@/utils/supabase/server';
import SubscriptionSetupForm from './_components/SubscriptionSetupForm';


type Props = {}

export default async function page({}: Props) {
  const supabase = createClient();

  const {data: { user } } = await supabase.auth.getUser();

  const { data: userDetails } = await supabase
  .from('profiles')
  .select('*')
  .single();

  const { data: subscription, error } = await supabase
  .from('subscriptions')
  .select('*, prices(*, products(*))')
  .in('status', ['trialing', 'active'])
  .maybeSingle();


  if (error) {
    console.log(error);
  }

  return (
    <div className="w-full">
        <div className="grid gap-6">
          <SubscriptionSetupForm subscription={subscription} />
        </div>
    </div>
  )
}