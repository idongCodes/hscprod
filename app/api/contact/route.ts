import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message must be less than 1000 characters')
});

// Rate limiting store (in production, use Redis/DB)
const rateLimit = new Map<string, number>();

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const ip = (request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown').split(',')[0].trim();
    const now = Date.now();
    const lastSubmission = rateLimit.get(ip) || 0;
    
    if (now - lastSubmission < 60000) { // 1 minute cooldown
      return NextResponse.json({ 
        error: 'Please wait before submitting again. Rate limit: 1 submission per minute.' 
      }, { status: 429 });
    }
    
    // Parse and validate request body
    const body = await request.json();
    const validated = contactSchema.parse(body);
    
    // Store in database (using your existing DB connection)
    const submission = {
      id: crypto.randomUUID(),
      name: validated.name,
      email: validated.email,
      message: validated.message,
      ip_address: ip,
      user_agent: request.headers.get('user-agent') || 'unknown',
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    // TODO: Replace with actual database insertion
    // await db.contact_submissions.create(submission);
    
    // Send email notification
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        await resend.emails.send({
          from: process.env.FROM_EMAIL || 'noreply@hscprod.com',
          to: [process.env.ADMIN_EMAIL || 'admin@hscprod.com'],
          subject: `🎵 New Contact Form Submission: ${validated.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #1a1a1a; border-radius: 8px;">
              <div style="background: #7c3aed; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="margin: 0; color: white;">📧 New Contact Form Submission</h2>
              </div>
              
              <div style="background: white; padding: 20px; border-radius: 8px;">
                <p><strong>Name:</strong> ${validated.name}</p>
                <p><strong>Email:</strong> ${validated.email}</p>
                <p><strong>Message:</strong></p>
                <div style="background: #f5f5f5; padding: 15px; border-radius: 4px; border-left: 4px solid #7c3aed;">
                  ${validated.message.replace(/\n/g, '<br>')}
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 4px; border: 1px solid #e5e7eb;">
                  <p style="margin: 0; color: #6b7280; font-size: 12px;">
                    <strong>IP Address:</strong> ${ip}<br>
                    <strong>User Agent:</strong> ${request.headers.get('user-agent') || 'unknown'}<br>
                    <strong>Submitted:</strong> ${new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          `
        });
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Continue even if email fails
      }
    }
    
    // Update rate limit
    rateLimit.set(ip, now);
    
    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      submission: {
        id: submission.id,
        name: submission.name,
        email: submission.email,
        created_at: submission.created_at
      }
    }, { status: 201 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: error.issues 
      }, { status: 400 });
    }
    
    console.error('Error processing contact form:', error);
    return NextResponse.json({ 
      error: 'Failed to submit contact form' 
    }, { status: 500 });
  }
}

// GET route for admin dashboard
export async function GET(request: NextRequest) {
  try {
    // TODO: Replace with actual database query
    // const submissions = await db.contact_submissions.findMany({
    //   orderBy: { created_at: 'desc' },
    //   take: 50
    // });
    
    // Mock data for now
    const submissions = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Great beats! Interested in collaboration.',
        status: 'pending',
        ip_address: '192.168.1.1',
        user_agent: 'Mozilla/5.0...',
        created_at: new Date().toISOString()
      }
    ];
    
    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch submissions' 
    }, { status: 500 });
  }
}
