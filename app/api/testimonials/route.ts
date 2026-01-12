import { NextResponse } from 'next/server';
import { db } from '@/lib/sqlite';

export async function GET() {
  try {
    const stmt = db.prepare('SELECT * FROM testimonials WHERE is_approved = 1 ORDER BY created_at DESC');
    const testimonials = stmt.all();
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}
