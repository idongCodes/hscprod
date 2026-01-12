import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

// Manual testimonial data storage
const manualTestimonials: any[] = [];

export async function GET() {
  try {
    const db = await getDatabase();
    const stmt = db.prepare('SELECT * FROM testimonials WHERE is_approved = 1 ORDER BY created_at DESC');
    const dbTestimonials = await stmt.all();
    
    // Combine database testimonials with manual ones
    const allTestimonials = [...dbTestimonials, ...manualTestimonials];
    
    // Sort by created_at (newest first)
    allTestimonials.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    
    return NextResponse.json(allTestimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { testimonial } = await request.json();
    
    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial data is required' }, { status: 400 });
    }
    
    // Add manual testimonial
    const newTestimonial = {
      id: Date.now().toString(),
      name: testimonial.name,
      title: testimonial.title,
      message: testimonial.message,
      is_approved: true, // Auto-approve manual testimonials
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    manualTestimonials.push(newTestimonial);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Testimonial added successfully!',
      testimonial: newTestimonial
    });
  } catch (error) {
    console.error('Error adding manual testimonial:', error);
    return NextResponse.json({ error: 'Failed to add testimonial' }, { status: 500 });
  }
}
