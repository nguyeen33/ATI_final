'use client';

import { useState, useEffect } from 'react';
import { useRouter, notFound } from 'next/navigation';
import { mockTests } from '../mock-data';
import { TestProvider, useTest } from '@/global/test-context';
import { ScoreProvider } from '@/global/score-context';
import { TestSection } from '@/types/test-exam';
import { ReadingPassage, Question, TestHeader, TestProgressBar } from '@/components/test-exam/test-components';
import { ListeningSection } from '@/components/test-exam/listening-section';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

function TestPageContent({ params }: { params: { id: string } }) {
  const router = useRouter();
  const test = mockTests.find(t => t.id === params.id);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showTimeUpDialog, setShowTimeUpDialog] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [activeSection, setActiveSection] = useState('reading');
  const { state: testState, dispatch: testDispatch } = useTest();

  useEffect(() => {
    if (testState.timeRemaining === 0) {
      setShowTimeUpDialog(true);
    }
  }, [testState.timeRemaining]);

  if (!test) {
    notFound();
  }

  const totalQuestions = test.sections.reduce(
    (total, section) => total + section.questions.length,
    0
  ) + (test.listeningTasks?.reduce(
    (total, task) => total + task.questions.length,
    0
  ) || 0);

  const answeredQuestions = Object.keys(testState.answers || {}).length;

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    testDispatch({ type: 'SET_SECTION', payload: section as TestSection });
  };

  const handleAnswer = (questionId: string, answer: string) => {
    testDispatch({
      type: 'ADD_ANSWER',
      payload: {
        questionId,
        value: answer,
        timestamp: new Date().toISOString(),
        sectionType: testState.currentSection
      }
    });
  };
  const handleSubmit = async () => {
    testDispatch({ type: 'SUBMIT_TEST' });
    
    try {
      const response = await fetch('/api/mock-tests/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testId: params.id,
          answers: testState.answers
        })
      });

      if (response.ok) {
        const { resultId } = await response.json();
        router.push(`/mock-tests/${params.id}/results?resultId=${resultId}`);
      } else {
        throw new Error('Failed to submit test');
      }
    } catch (error) {
      console.error('Error submitting test:', error);
      // Show error message to user
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TestHeader
        timeRemaining={testState.timeRemaining}
        onPause={() => testDispatch({ type: 'TOGGLE_PAUSE' })}
        isPaused={testState.isPaused}
        pausesRemaining={testState.pausesRemaining}
        onSave={() => testDispatch({ type: 'SAVE_STATE' })}
        lastSaved={testState.lastSaved}
      />

      <div className="container py-6">
        <Tabs value={activeSection} onValueChange={handleSectionChange}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="reading">Reading</TabsTrigger>
            <TabsTrigger value="listening">Listening</TabsTrigger>
          </TabsList>

          <TabsContent value="reading">
            {test.sections.map((section, index) => (
              <div key={index} className="mb-8">
                <ReadingPassage
                  title={section.title}
                  content={section.content}
                  onHighlight={setSelectedText}
                />
                <div className="space-y-6 mt-4">
                  {section.questions.map((question) => {
                    if (question.type === 'multiple-choice') {
                      return (
                        <Question
                          key={question.id}
                          id={question.id}
                          question={question.question}
                          options={question.options}
                          onAnswer={handleAnswer}
                          selectedAnswer={testState.answers[question.id]?.value}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="listening">
            <div className="space-y-6">
              {test.listeningTasks?.map((task, index) => (
                <div key={index} className="p-4 border rounded">
                  <h3 className="text-xl font-semibold mb-4">{task.title}</h3>
                  <div className="space-y-4">
                    {task.questions.map((question) => (
                      <Question
                        key={question.id}
                        id={question.id}
                        question={question.question}
                        options={'options' in question ? question.options : []}
                        onAnswer={handleAnswer}
                        selectedAnswer={testState.answers[question.id]?.value}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-end">
          <Button onClick={() => setShowSubmitDialog(true)}>
            Submit Test
          </Button>
        </div>
      </div>

      {/* Submit Confirmation Dialog */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Test</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your test? You have {totalQuestions - answeredQuestions} unanswered questions.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubmitDialog(false)}>
              Continue Test
            </Button>
            <Button onClick={handleSubmit}>
              Submit Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Time Up Dialog */}
      <AlertDialog open={showTimeUpDialog} onOpenChange={setShowTimeUpDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Time&apos;s Up!</AlertDialogTitle>
            <AlertDialogDescription>
              Your time has expired. Your test will be submitted automatically.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleSubmit}>
              View Results
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function MockTestPage({ params }: { params: { id: string } }) {
  return (
    <TestProvider>
      <ScoreProvider>
        <TestPageContent params={params} />
      </ScoreProvider>
    </TestProvider>
  );
}