"use client"

import React from 'react'
import { cn } from "@/lib/utils";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import signUp from '@/actions/auth/signup';
import SignupButton from './SignupButton';
import { Button } from '@/components/ui/button';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SignupForm({ className, ...props }: UserAuthFormProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter()
    const {toast} = useToast()
    
;
  const resetParams = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("status");
    router.replace(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams]);

  useEffect(() => {
    const status = searchParams.get("status");
    if (status) {
      if (status === "error") {
        toast({
          title: "Error",
          description: "Something went wrong.",
          variant: "destructive",
        });

        resetParams();
      } else {
        toast({
          title: "Success",
          description: "Check your email to continue sign up process",
        });
        resetParams();
      }
    }
  }, [resetParams, searchParams, toast]);
    
    



  return (
    <div className={cn("grid gap-6", className)} {...props}>
        <form action={signUp}>
            <div className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input name="email" placeholder="m@example.com" required type="email" />
            </div>
            <div className="grid gap-2">
                <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link className="ml-auto inline-block text-sm underline" href="#">
                    Forgot your password?
                </Link>
                </div>
                <Input name="password" required type="password" />
            </div>
            <SignupButton />
            <Button className="w-full" variant="outline">
                Login with Google
            </Button>
            </div>
        </form>
    </div>
  )
}