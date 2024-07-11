import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from  "@/components/ui/popover";
import { Copy } from 'lucide-react';

type Props = {}

export default function ResendContract({}: Props) {
  return (
    <Popover>
        <PopoverTrigger asChild>
        <Button className='text-xs md:text-sm'>Client Resend</Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="min-w-[40vw] space-y-3 max-w-[90vw]">
            <div className="flex flex-col space-y-2 text-center sm:text-left">
                <h3 className="text-lg font-semibold">Project Agreement Link</h3>
                <p className="md:text-sm text-xs text-muted-foreground">
                Before sending the agreement details for the client to sign on please use this link to go through the agreement and be sure there are no corrections to be made but if you have gone through the agreement just send with the button below
                </p>
            </div>
            <div className="flex items-center space-x-2 pt-4">
                <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                    Link
                </Label>
                <Input
                    id="link"
                    defaultValue="https://platform.openai.com/playground/p/7bbKYQvsVkNmVb8NGcdUOLae?model=text-davinci-003"
                    readOnly
                    className="h-9"
                />
                </div>
                <Button type="submit" size="sm" className="px-3">
                <span className="sr-only">Copy</span>
                <Copy className="h-4 w-4" />
                </Button>
            </div>
            <div className="flex space-x-2">
                <Button>Resend Agreement</Button>
                <Button>View Agreement</Button>

            </div>
        </PopoverContent>
    </Popover>
  )
}