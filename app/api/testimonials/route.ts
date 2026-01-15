import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const result = await pool.query(
      'SELECT * FROM testimonials WHERE is_approved = true ORDER BY created_at DESC'
    );
    
    return NextResponse.json(result.rows);
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
    
    const result = await pool.query(
      'INSERT INTO testimonials (name, title, message, is_approved, source, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *',
      [name, title, message, false, 'user']
    );
    
    console.log('New testimonial submitted:', result.rows[0]);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Testimonial submitted successfully! It will appear on site once approved.',
      testimonial: result.rows[0]
    });
  } catch (error) {
    console.error('Error submitting testimonial:', error);
    return NextResponse.json({ error: 'Failed to submit testimonial' }, { status: 500 });
  }
}
