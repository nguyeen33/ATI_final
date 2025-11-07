'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
// SectionType enum is not exported from @prisma/client in this project — use string literal values like 'READING'

export const seedMockTests = async () => {
  const mockTests = [
    {
      name: '17',
      totalQuestions: 40,
      duration: 3600,
      isPublic: true,
      sectionType: 'READING',
      parts: {
        create: Array.from({ length: 3 }).map((_, i) => ({
          title: `Part ${i + 1}`,
          description: 'Part Description',
          order: i
        }))
      }
    },
    {
      name: '18',
      totalQuestions: 40,
      duration: 3600,
      isPublic: true,
      sectionType: 'READING',
      parts: {
        create: Array.from({ length: 3 }).map((_, i) => ({
          title: `Part ${i + 1}`,
          description: 'Part Description',
          order: i
        }))
      }
    },
    {
      name: '19',
      totalQuestions: 40,
      duration: 3600,
      isPublic: true,
      sectionType: 'READING',
      parts: {
        create: Array.from({ length: 3 }).map((_, i) => ({
          title: `Part ${i + 1}`,
          description: 'Part Description',
          order: i
        }))
      }
    }
  ];

  for (const test of mockTests) {
    await db.assessment.create({
      data: test
    });
  }

  revalidatePath('/mock-tests');
};