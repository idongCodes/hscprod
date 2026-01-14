import { NextRequest, NextResponse } from 'next/server';
import { sendFeatureUpdateEmail, sendTestEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { type } = await request.json();
    
    if (type === 'feature') {
      const result = await sendFeatureUpdateEmail();
      return NextResponse.json(result);
    } else if (type === 'test') {
      const result = await sendTestEmail();
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ error: 'Invalid email type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
