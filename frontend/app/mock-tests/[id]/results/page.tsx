'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useScore } from '@/global/score-context';

export default function TestResultPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { state } = useScore();
  const { scores } = state;

  useEffect(() => {
    if (!state.testId || state.testId !== params.id) {
      router.push('/mock-tests');
    }
  }, [state.testId, params.id, router]);

  if (!state.testId || state.testId !== params.id) {
    return null;
  }

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Test Results</h1>

        {/* Overall Score */}
        <Card className="p-6 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Overall Band Score</h2>
            <div className="text-5xl font-bold text-primary mb-4">
              {scores.bandScore.toFixed(1)}
            </div>
            <Progress value={(scores.bandScore / 9) * 100} className="h-2 mb-2" />
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Reading Section */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Reading</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Score</span>
                <span className="font-semibold">
                  {scores.reading.score}/{scores.reading.total}
                </span>
              </div>
              <Progress 
                value={(scores.reading.score / scores.reading.total) * 100} 
                className="h-2" 
              />
            </div>
          </Card>

          {/* Listening Section */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Listening</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Score</span>
                <span className="font-semibold">
                  {scores.listening.score}/{scores.listening.total}
                </span>
              </div>
              <Progress 
                value={(scores.listening.score / scores.listening.total) * 100} 
                className="h-2" 
              />
            </div>
          </Card>

          {/* Writing Section */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Writing</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Task 1</p>
                  <p className="font-semibold">{scores.writing.task1Score.toFixed(1)}/9</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Task 2</p>
                  <p className="font-semibold">{scores.writing.task2Score.toFixed(1)}/9</p>
                </div>
              </div>
              {scores.writing.feedback.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Feedback</h4>
                  <ul className="text-sm space-y-1">
                    {scores.writing.feedback.map((feedback, index) => (
                      <li key={index}>{feedback}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>

          {/* Speaking Section */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Speaking</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Fluency</p>
                  <p className="font-semibold">{scores.speaking.fluencyScore.toFixed(1)}/9</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pronunciation</p>
                  <p className="font-semibold">{scores.speaking.pronunciationScore.toFixed(1)}/9</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Grammar</p>
                  <p className="font-semibold">{scores.speaking.grammarScore.toFixed(1)}/9</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vocabulary</p>
                  <p className="font-semibold">{scores.speaking.vocabularyScore.toFixed(1)}/9</p>
                </div>
              </div>
              {scores.speaking.feedback.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Feedback</h4>
                  <ul className="text-sm space-y-1">
                    {scores.speaking.feedback.map((feedback, index) => (
                      <li key={index}>{feedback}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          <Button variant="outline" onClick={() => router.push('/mock-tests')}>
            Back to Tests
          </Button>
          <Button onClick={() => window.print()}>Download Report</Button>
        </div>
      </div>
    </div>
  );
}