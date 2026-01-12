import { NextResponse } from 'next/server';
import { getGalleryMedia } from '@/lib/database';

export async function GET() {
  try {
    const media = await getGalleryMedia();
    return NextResponse.json(media);
  } catch (error) {
    console.error('Error fetching gallery media:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery media' }, { status: 500 });
  }
}
