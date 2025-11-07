'use client';

import Link from 'next/link';
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface LiveLesson {
  id: string;
  title: string;
  instructor: string;
  instructorTitle: string;
  instructorImage: string;
  date: string;
  time: string;
  description: string;
  language: string;
  organizer: string;
  status: 'free' | 'rewatch' | 'buy';
}

const upcomingLessons: LiveLesson[] = [
  {
    id: '1',
    title: 'Improve Your IELTS Listening: Part 1 & 2',
    instructor: 'Tomas T.',
    instructorTitle: 'Expert IELTS instructor and assessor',
    instructorImage: '/instructors/tomas.jpg',
    date: 'November 13',
    time: '08:00 PM(GMT +7)',
    description: 'In this free interactive webinar, our IELTS expert will show us how to tackle Part 1 and 2 of the IELTS Listening Test. You\'ll have the opportunity to practice key listening skills and ask questions throughout the presentation.',
    language: 'English',
    organizer: 'InterGreat Education Group',
    status: 'free'
  },
  {
    id: '2',
    title: 'IELTS Listening Part 3 & 4',
    instructor: 'Soheila A.',
    instructorTitle: 'Expert IELTS instructor and assessor',
    instructorImage: '/instructors/soheila.jpg',
    date: 'October 13',
    time: '07:00 PM(GMT +7)',
    description: 'In this free interactive webinar, our IELTS expert will show us how to tackle Part 3 and 4 of the IELTS Listening Test. You\'ll have the opportunity to practice key listening skills, and ask questions throughout the presentation.',
    language: 'English',
    organizer: 'InterGreat Education Group',
    status: 'rewatch'
  }
];

export default function LiveLessonsPage() {
  return (
    <div className="container py-6">
      <PageHeader>
        <PageHeaderHeading>Live Lessons</PageHeaderHeading>
        <PageHeaderDescription>
          Join interactive IELTS preparation lessons with expert instructors
        </PageHeaderDescription>
      </PageHeader>

      <div className="grid gap-6 mt-6">
        {upcomingLessons.map((lesson) => (
          <Card key={lesson.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <CardTitle className="text-2xl">{lesson.title}</CardTitle>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded">
                      {lesson.date}
                    </span>
                    <span className="px-2 py-1 text-sm bg-gray-100 rounded">
                      {lesson.time}
                    </span>
                    <span className="px-2 py-1 text-sm bg-gray-100 rounded">
                      {lesson.language}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <p className="text-gray-600">{lesson.description}</p>
                  <div className="mt-4 flex items-center space-x-2">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                      {/* Add proper image handling later */}
                      <div className="w-full h-full bg-gray-300" />
                    </div>
                    <div>
                      <p className="font-medium">{lesson.instructor}</p>
                      <p className="text-sm text-gray-600">{lesson.instructorTitle}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{lesson.organizer}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {lesson.status === 'free' && (
                <Button className="w-full">Join</Button>
              )}
              {lesson.status === 'rewatch' && (
                <Button variant="outline" className="w-full">Rewatch</Button>
              )}
              {lesson.status === 'buy' && (
                <Button variant="default" className="w-full">Buy Now</Button>
              )}
              <Button variant="link" className="ml-2">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}