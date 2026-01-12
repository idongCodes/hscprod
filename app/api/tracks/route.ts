import { NextResponse } from 'next/server';

const audioTracks = [
  {
    id: '1',
    title: 'Trap Beat 1',
    artist: 'HSC',
    duration: '2:45',
    bpm: 140,
    genre: 'Trap',
    price: 49.99,
    previewUrl: '/audio/trap-beat-1-preview.mp3',
    fullUrl: '/audio/trap-beat-1-full.mp3'
  },
  {
    id: '2',
    title: 'R&B Instrumental',
    artist: 'HSC',
    duration: '3:20',
    bpm: 85,
    genre: 'R&B',
    price: 59.99,
    previewUrl: '/audio/rnb-instrumental-preview.mp3',
    fullUrl: '/audio/rnb-instrumental-full.mp3'
  }
];

export async function GET() {
  try {
    return NextResponse.json(audioTracks);
  } catch (error) {
    console.error('Error fetching audio tracks:', error);
    return NextResponse.json({ error: 'Failed to fetch audio tracks' }, { status: 500 });
  }
}
