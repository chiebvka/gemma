import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react'
import DesktopHeader from './_components/DesktopHeader';

type Props = {}

export default async function ProtectedLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const supabase = createClient();
    const {data: { user },} = await supabase.auth.getUser();
  
    if (!user) {
      return redirect("/login");
    }
  
  return (
    <div className='w-full bg-muted/40'>
      <DesktopHeader />
        {children}
    </div>
  )
}