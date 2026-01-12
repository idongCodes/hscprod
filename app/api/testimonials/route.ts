import { NextRequest, NextResponse } from 'next/server';
import { getTestimonials, addTestimonial } from '@/lib/testimonial-storage';

export async function GET() {
  try {
    // Return only approved testimonials for public display
    const allTestimonials = getTestimonials();
    const approvedTestimonials = allTestimonials.filter(t => t.is_approved === true);
    return NextResponse.json(approvedTestimonials);
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
    
    // Add to persistent storage
    addTestimonial(newTestimonial);
    
    console.log('New testimonial submitted:', newTestimonial);
    
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
