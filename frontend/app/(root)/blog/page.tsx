'use client';

import Image from 'next/image';
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const blogPosts = [
  {
    id: 1,
    title: 'IELTS Gemeral Format',
    description: 'Master the art of IELTS writing with our comprehensive guide. Learn how to structure your essays, use advanced vocabulary, and achieve that Band 8+ score.',
    image: '/blog/GeneralFormat.jpg',
    date: 'November 1, 2025'
  },
  {
    id: 2,
    title: 'Reading Skill Tips',
    description: 'Effective strategies for IELTS speaking test. Includes common topics, useful phrases, and tips for maintaining fluency throughout your speaking exam.',
    image: '/blog/ReadingTip.jpg',
    date: 'October 28, 2025'
  },
  {
    id: 3,
    title: 'Listening Skill Tips',
    description: 'Improve your reading speed and comprehension with these proven techniques. Learn how to tackle different question types and manage your time effectively.',
    image: '/blog/ListeningTip.jpg',
    date: 'October 10, 2025'
  },
  {
    id: 4,
    title: 'Focusing Tips',
    description: 'Expert tips for mastering the IELTS listening test. From note-taking techniques to understanding different accents, this guide covers it all.',
    image: '/blog/FocusTip.jpg',
    date: 'October 20, 2023'
  }
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader>
        <PageHeaderHeading>IELTS Blog</PageHeaderHeading>
        <PageHeaderDescription>
          Expert tips and strategies to help you succeed in your IELTS journey
        </PageHeaderDescription>
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mt-6">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{post.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}