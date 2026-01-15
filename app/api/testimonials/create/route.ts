import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
// import { sendTestimonialNotificationEmail } from '@/lib/email';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Generate a simple ID
function generateId() {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, title, message } = body;

    if (!name || !title || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const id = generateId();
    
    const result = await pool.query(
      'INSERT INTO testimonials (id, name, title, message, is_approved, source, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) RETURNING *',
      [id, name, title, message, 0, 'user']
    );

    const data = result.rows[0];
    
    console.log('New testimonial submitted:', data);
    
    // Send email notification (non-blocking)
    // Temporarily disabled for testing
    // if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'your_resend_api_key_here') {
    //   sendTestimonialNotificationEmail(data).catch(emailError => {
    //     console.error('Email notification failed:', emailError);
    //   });
    // } else {
    //   console.log('Email notification skipped - RESEND_API_KEY not configured');
    // }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Testimonial submitted successfully! It will be reviewed and added shortly.',
      testimonial: data
    });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}

// Admin endpoint to get pending testimonials
export async function GET() {
  try {
    const result = await pool.query(
      'SELECT * FROM testimonials WHERE is_approved = 0 ORDER BY created_at DESC'
    );

    return NextResponse.json(result.rows || []);
  } catch (error) {
    console.error('Error fetching pending testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch pending testimonials' }, { status: 500 });
  }
}
