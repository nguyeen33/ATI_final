'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';

export default function ReadingTestPage() {
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 0) {
          clearInterval(timer);
          return 0;
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container py-6 max-w-7xl">
      <div className="sticky top-0 bg-background z-10 pb-4 mb-4 border-b">
        <div className="flex justify-between items-center">
          <PageHeader>
            <h1 className="text-3xl font-bold">IELTS Reading Test</h1>
            <p className="text-lg text-muted-foreground">Academic Reading Practice Test</p>
          </PageHeader>
          <div className="text-2xl font-bold">
            Time Left: {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-1 h-[calc(100vh-200px)] overflow-y-auto">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Reading Passage 1</h2>
            <div className="prose max-w-none">
              {/* Add your reading passage content here */}
              <p>Reading passage content goes here...</p>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Questions 1-5</h3>
              {/* Add your questions here */}
              <div className="space-y-4">
                <p>Questions will be added here...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}