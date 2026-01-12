import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/sqlite';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const action = searchParams.get('action');

  if (!id || !action || !['approve', 'reject'].includes(action)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  try {
    const stmt = db.prepare('UPDATE testimonials SET is_approved = ?, updated_at = datetime("now") WHERE id = ?');
    const isApproved = action === 'approve' ? 1 : 0;
    
    stmt.run(isApproved, id);

    const testimonial = db.prepare('SELECT * FROM testimonials WHERE id = ?').get(id);

    return NextResponse.json({
      success: true,
      action,
      testimonial
    });

  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}
