'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, PauseCircle } from 'lucide-react';

export default function ListeningTestPage() {
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [isPlaying, setIsPlaying] = useState(false);

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
          <PageHeader 
            title="IELTS Listening Test" 
          />
          <div className="text-2xl font-bold">
            Time Left: {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Section 1</h2>
              <p className="text-muted-foreground">Listen to a conversation between two people</p>
            </div>
            
            <div className="flex justify-center my-8">
              <Button
                size="lg"
                variant="outline"
                className="w-16 h-16 rounded-full"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <PauseCircle className="h-8 w-8" />
                ) : (
                  <PlayCircle className="h-8 w-8" />
                )}
              </Button>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Audio Transcript</h3>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {isPlaying ? "Now playing..." : "Click play to start the audio"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Questions 1-5</h3>
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