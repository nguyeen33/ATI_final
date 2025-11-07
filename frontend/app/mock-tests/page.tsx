'use client';

import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TestSelectionDialog } from '@/components/test-exam/test-selection-dialog';

const mockTests = [
  { id: '1', name: '16', image: '/mock-tests/ieltsTest.png' },
  { id: '2', name: '17', image: '/mock-tests/ieltsTest.png' },
  { id: '3', name: '18', image: '/mock-tests/ieltsTest.png' },
  { id: '4', name: '19', image: '/mock-tests/ieltsTest.png' }
];

export default function MockTestsPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tight">Mock Tests</h1>
      <p className="text-muted-foreground mt-2">
        The test includes Listening and Reading skills. Be sure you have enough time. Good luck!
      </p>

      <div className="grid gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-4">
        {mockTests.map((test) => (
          <div
            key={test.id}
            className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col"
          >
            <div className="aspect-square w-full relative">
              <Image
                src={test.image}
                alt={`IELTS ${test.name}`}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <div className="p-4 mt-auto">
              <TestSelectionDialog
                trigger={
                  <button className={cn(buttonVariants({ className: 'w-full' }))}>
                    Start Test
                  </button>
                }
                testId={test.id}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


