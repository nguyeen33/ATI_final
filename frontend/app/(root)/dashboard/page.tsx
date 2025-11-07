'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';

interface TestResult {
  id: string;
  score: number;
  totalCorrectAnswers: number;
  timeSpent: number;
  createdAt: string;
  assessment: {
    name: string;
  };
}

export default function DashboardPage() {
  const [recentTests, setRecentTests] = useState<TestResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentTests() {
      try {
        const response = await fetch('/api/mock-tests/results');
        if (response.ok) {
          const data = await response.json();
          setRecentTests(data);
        }
      } catch (error) {
        console.error('Error fetching recent tests:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecentTests();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader>
        <PageHeaderHeading>Dashboard</PageHeaderHeading>
        <PageHeaderDescription>
          View your test history and performance analytics.
        </PageHeaderDescription>
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Tests Taken</CardTitle>
            <CardDescription>Total number of tests completed</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {isLoading ? '...' : recentTests.length}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Score</CardTitle>
            <CardDescription>Your average test performance</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {isLoading
              ? '...'
              : recentTests.length > 0
              ? (
                  recentTests.reduce((acc, test) => acc + test.score, 0) /
                  recentTests.length
                ).toFixed(1)
              : 'N/A'}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest test results</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading...</p>
            ) : recentTests.length > 0 ? (
              <ul className="space-y-2">
                {recentTests.slice(0, 3).map((test) => (
                  <li key={test.id} className="flex justify-between items-center">
                    <span className="text-sm truncate">{test.assessment.name}</span>
                    <span className="text-sm font-medium">{test.score}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No tests taken yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex justify-center">
        <Link 
          href="/mock-tests" 
          className={buttonVariants({ variant: "default", size: "lg" })}
        >
          View All Tests
        </Link>
      </div>
    </div>
  );
}