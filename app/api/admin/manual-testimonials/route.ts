import { NextRequest, NextResponse } from 'next/server';

// Persistent storage for manual testimonials
let manualTestimonials: any[] = [
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

// Get all manual testimonials (including non-approved ones for admin)
export async function GET() {
  try {
    return NextResponse.json(manualTestimonials);
  } catch (error) {
    console.error('Error fetching manual testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch manual testimonials' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const testimonial = await request.json();
    
    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial data is required' }, { status: 400 });
    }
    
    const newTestimonial = {
      id: Date.now().toString(),
      ...testimonial,
      is_approved: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      source: 'manual'
    };
    
    // Add to persistent storage
    manualTestimonials.push(newTestimonial);
    
    // Return the testimonial directly (not wrapped in success object)
    return NextResponse.json(newTestimonial);
  } catch (error) {
    console.error('Error adding manual testimonial:', error);
    return NextResponse.json({ error: 'Failed to add manual testimonial' }, { status: 500 });
  }
}
