import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import CreateHeadings from "../../_components/CreateHeadings";
import { setups } from "@/config";
import Breadcrumbs from "./_components/Breadcrumbs";
import SetupNavigation from "./_components/SetupNavigation";


export default async function SetupLayout({
    children,
    slot
  }: {
    children: React.ReactNode;
    slot: React.ReactNode;
  }) {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();


  

  return (
    <div className='flex-1 w-full p-4 max-w-5xl mx-auto border-2 border-green-600  flex flex-col space-x-2'>
        <CreateHeadings title='Setup Profile & Invoice Forms' description='Setup your profile and prepopulate your invoices and receipts '  />

        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4  py-4 md:gap-8 md:py-4">
            <div className="mx-auto grid w-full max-w-6xl gap-2">
              {/* <h1 className="text-3xl font-semibold">Settings</h1> */}
            </div>
            <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                <SetupNavigation />

              <div className="grid gap-6">
                {children}
              </div>
            </div>
          </main>
      
    </div>
  )
}