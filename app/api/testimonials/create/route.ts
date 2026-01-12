import { NextRequest, NextResponse } from 'next/server';
import { createTestimonial } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, title, message } = body;

    if (!name || !title || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const testimonial = await createTestimonial({ name, title, message });
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}
