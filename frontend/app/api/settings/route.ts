import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await db.user.findUnique({
      where: {
        id: session.user.id
      }
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const settings = {
      name: user.name || '',
      email: user.email || '',
      emailNotifications: user.emailNotifications,
      soundEnabled: user.soundEnabled,
      timerWarnings: user.timerWarnings
    };

    return NextResponse.json(settings);
  } catch (error) {
    console.error('[SETTINGS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { name, email, emailNotifications, soundEnabled, timerWarnings } = body;

    const user = await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
        email,
        emailNotifications,
        soundEnabled,
        timerWarnings,
      },
    });

    const settings = {
      name: user.name || '',
      email: user.email || '',
      emailNotifications: user.emailNotifications,
      soundEnabled: user.soundEnabled,
      timerWarnings: user.timerWarnings
    };

    return NextResponse.json(settings);
  } catch (error) {
    console.error('[SETTINGS_PUT]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}