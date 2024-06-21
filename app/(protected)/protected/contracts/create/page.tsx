

import React from 'react';
import CreateProject from './CreateProject';
import { createClient } from '@/utils/supabase/server';

type Props = {}


export default async function page({}: Props) {
    const supabase = createClient();

    const {data: { user } } = await supabase.auth.getUser();


  return (

        <div className="flex-1 w-full p-4 max-w-5xl mx-auto border-2 border-green-600 flex flex-col space-x-2 items-center">
            <CreateProject />
        </div>
  )
}