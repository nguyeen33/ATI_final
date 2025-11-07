import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Answer, TestSection } from '@/types/test-exam';
import { auth } from '@/auth';

function calculateBandScore(score: number, section: TestSection): number {
  // This is a simplified band score calculation
  // In a real application, you would use official IELTS band score conversion tables
  const rawScore = score * 9; // Convert to 0-9 scale
  return Math.round(rawScore * 2) / 2; // Round to nearest 0.5
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { testId, answers, sectionScores } = await req.json();

    if (!testId || !answers || !sectionScores) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate band scores for each section
    const bandScores = {
      reading: calculateBandScore(sectionScores.reading, 'reading'),
      listening: calculateBandScore(sectionScores.listening, 'listening'),
      writing: calculateBandScore(sectionScores.writing, 'writing'),
      speaking: calculateBandScore(sectionScores.speaking, 'speaking'),
      overall: 0 // Will be calculated below
    };

    // Calculate overall band score (average of all sections)
    bandScores.overall = Math.round(
      ((bandScores.reading +
        bandScores.listening +
        bandScores.writing +
        bandScores.speaking) /
        4) *
        2
    ) / 2;

    // Create test result record
    const testResult = await db.testResult.create({
      data: {
        testId,
        userId: session.user.id,
        startTime: new Date(answers[0].timestamp).toISOString(),
        endTime: new Date().toISOString(),
        answers: answers as Answer[],
        readingScore: sectionScores.reading,
        listeningScore: sectionScores.listening,
        writingScore: sectionScores.writing,
        speakingScore: sectionScores.speaking,
        overallScore: sectionScores.overall,
        readingBandScore: bandScores.reading,
        listeningBandScore: bandScores.listening,
        writingBandScore: bandScores.writing,
        speakingBandScore: bandScores.speaking,
        overallBandScore: bandScores.overall,
      }
    });

    return NextResponse.json({ resultId: testResult.id });
  } catch (error) {
    console.error('Error submitting test:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}