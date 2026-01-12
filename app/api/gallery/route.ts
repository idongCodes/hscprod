import { NextResponse } from 'next/server';

const galleryMedia = [
  {
    id: '1',
    title: 'Studio Session 1',
    type: 'image',
    url: '/images/gallery/studio1.jpg',
    description: 'Behind the scenes at HSC Studio'
  },
  {
    id: '2',
    title: 'Studio Session 2',
    type: 'image',
    url: '/images/gallery/studio2.jpg',
    description: 'Recording setup and equipment'
  }
];

export async function GET() {
  try {
    return NextResponse.json(galleryMedia);
  } catch (error) {
    console.error('Error fetching gallery media:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery media' }, { status: 500 });
  }
}
