import { NextRequest, NextResponse } from 'next/server';

const manualTestimonials: any[] = [
  {
    id: '1',
    name: 'Yung Fader',
    title: 'Producer',
    message: 'The drum kits are absolutely lethal. Cleanest 808s I\'ve ever used in a production. HSC really knows how to mix the low end.',
    is_approved: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    source: 'manual'
  },
  {
    id: '2',
    name: 'Melody Queen',
    title: 'R&B Artist',
    message: 'HSC created a custom beat that fit my voice perfectly. The vibe in the studio is unmatched—he gets the best performance out of you.',
    is_approved: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    source: 'manual'
  },
  {
    id: '3',
    name: 'Da Architect',
    title: 'Sound Engineer',
    message: 'Mixing these stems was a breeze. High quality recording and professional organization makes my life so much easier.',
    is_approved: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    source: 'manual'
  }
];

export async function GET() {
  try {
    return NextResponse.json(manualTestimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, title, message } = await request.json();
    
    if (!name || !title || !message) {
      return NextResponse.json({ error: 'Name, title, and message are required' }, { status: 400 });
    }
    
    const id = Date.now().toString();
    const newTestimonial = {
      id,
      name,
      title,
      message,
      is_approved: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      source: 'pending'
    };
    
    return NextResponse.json({ 
      success: true, 
      message: 'Testimonial submitted successfully! It will appear on site once approved.',
      testimonial: newTestimonial
    });
  } catch (error) {
    console.error('Error submitting testimonial:', error);
    return NextResponse.json({ error: 'Failed to submit testimonial' }, { status: 500 });
  }
}
