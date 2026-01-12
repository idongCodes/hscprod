import { NextResponse } from 'next/server';
import { getAudioTracks } from '@/lib/database';

export async function GET() {
  try {
    const tracks = await getAudioTracks();
    return NextResponse.json(tracks);
  } catch (error) {
    console.error('Error fetching audio tracks:', error);
    return NextResponse.json({ error: 'Failed to fetch audio tracks' }, { status: 500 });
  }
}
