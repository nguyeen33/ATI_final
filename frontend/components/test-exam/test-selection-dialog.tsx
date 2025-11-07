'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface TestSelectionDialogProps {
  trigger: React.ReactNode;
}

export function TestSelectionDialog({ trigger }: TestSelectionDialogProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Choose Your Test </DialogTitle>
          <DialogDescription>
            Select which IELTS skill you would like to practice
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 md:grid-cols-2">
          <Card 
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => {
              setOpen(false);
              router.push('/mock-tests/reading');
            }}
          >
            <CardHeader>
              <CardTitle>Reading Test</CardTitle>
              <CardDescription>Practice your reading skill </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-4 space-y-2 text-sm">
                <li>Academic reading passages</li>
                <li>Variety of question types</li>
                <li>60 minutes duration</li>
                <li>Score feedback</li>
              </ul>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => {
              setOpen(false);
              router.push('/mock-tests/listening');
            }}
          >
            <CardHeader>
              <CardTitle>Listening Test</CardTitle>
              <CardDescription>Enhance your listening skill</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-4 space-y-2 text-sm">
                <li>4 different sections</li>
                <li>Multiple audio formats</li>
                <li>30 minutes duration</li>
                <li>Detailed feedback</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}