import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';
import { sendTestimonialApprovalEmail, TestimonialData } from '@/lib/email';

export async function GET() {
  try {
    const db = await getDatabase();
    const stmt = db.prepare('SELECT * FROM testimonials WHERE is_approved = 1 ORDER BY created_at DESC');
    const testimonials = await stmt.all();
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = await getDatabase();
    const { name, title, message } = await request.json();
    
    if (!name || !title || !message) {
      return NextResponse.json({ error: 'Name, title, and message are required' }, { status: 400 });
    }
    
    // Generate unique ID
    const id = Date.now().toString();
    
    // Insert testimonial (pending approval by default)
    const stmt = db.prepare(`
      INSERT INTO testimonials (id, name, title, message, is_approved)
      VALUES (?, ?, ?, ?, 0)
    `);
    
    await stmt.run(id, name, title, message);
    
    // Get the inserted testimonial for email
    const testimonial = await db.prepare('SELECT * FROM testimonials WHERE id = ?').get(id);
    
    // Send email notification
    try {
      await sendTestimonialApprovalEmail(testimonial as TestimonialData);
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't fail the request if email fails
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Testimonial submitted successfully! It will appear on the site once approved.',
      testimonial: {
        id,
        name,
        title,
        message,
        is_approved: 0
      }
    });
  } catch (error) {
    console.error('Error submitting testimonial:', error);
    return NextResponse.json({ error: 'Failed to submit testimonial' }, { status: 500 });
  }
}
