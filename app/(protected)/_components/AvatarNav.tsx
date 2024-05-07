// "use client"
import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from  '@/components/ui/dropdown-menu';
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';


type Props = {}

export default async function AvatarNav({}: Props) {
  
  const supabase = createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const email = user?.email || ""
  
    const signOut = async () => {
      "use server";
  
      const supabase = createClient();
      await supabase.auth.signOut();
      return redirect("/login");
    };
  
  return (
       <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>{email.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Hello 👋🏻</p>
            <p className="text-xs leading-none text-muted-foreground">
             {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/" className='cursor-pointer w-full'>
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/" className='cursor-pointer w-full'>
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/protected/setup" className='cursor-pointer w-full'>
              Setup
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className=''>
          <form action={signOut} className='relative w-full'>
            <Button variant="ghost" className='w-full items-start justify-start -ml-2 -my-2'>
              Log out
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}