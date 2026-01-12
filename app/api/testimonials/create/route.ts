import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage for new testimonials
const pendingTestimonials: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, title, message } = body;

    if (!name || !title || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const id = Date.now().toString();
    const now = new Date().toISOString();
    
    const newTestimonial = {
      id,
      name,
      title,
      message,
      is_approved: false,
      created_at: now,
      updated_at: now,
      source: 'pending'
    };
    
    // Store in memory (you'll get email notification to manually approve)
    pendingTestimonials.push(newTestimonial);
    
    console.log('New testimonial submitted:', newTestimonial);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Testimonial submitted successfully! It will be reviewed and added shortly.',
      testimonial: newTestimonial
    });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}

// Admin endpoint to get pending testimonials
export async function GET() {
  try {
    return NextResponse.json(pendingTestimonials);
  } catch (error) {
    console.error('Error fetching pending testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch pending testimonials' }, { status: 500 });
  }
}
