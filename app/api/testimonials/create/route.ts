import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const db = await getDatabase();
    const body = await request.json();
    const { name, title, message } = body;

    if (!name || !title || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const id = Date.now().toString();
    const now = new Date().toISOString();
    
    const stmt = db.prepare(`
      INSERT INTO testimonials (id, name, title, message, is_approved, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    await stmt.run(id, name, title, message, 0, now, now);
    
    const newTestimonial = {
      id,
      name,
      title,
      message,
      is_approved: false,
      created_at: now,
      updated_at: now
    };

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}
