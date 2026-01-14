import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, usePrisma } from '@/lib/supabase';
import { sendTestimonialNotificationEmail } from '@/lib/email';
import { addProductionTestimonial, getPendingProductionTestimonials } from '@/lib/production-storage';

export async function POST(request: NextRequest) {
  try {
    console.log('Create testimonials API called, usePrisma:', usePrisma);
    
    const body = await request.json();
    const { name, title, message } = body;
    
    console.log('Testimonial data received:', { name, title, message });

    if (!name || !title || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (usePrisma) {
      // Use production storage
      console.log('Using production storage for new testimonial');
      const testimonial = addProductionTestimonial({
        name,
        title,
        message,
        is_approved: false,
        source: 'user'
      });

      console.log('New testimonial submitted (production storage):', testimonial);
      
      // Send email notification if configured
      if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'your_resend_api_key_here') {
        sendTestimonialNotificationEmail(testimonial).catch(emailError => {
          console.error('Email notification failed:', emailError);
        });
      }
      
      return NextResponse.json({ 
        success: true, 
        message: 'Testimonial submitted successfully! It will be reviewed and added shortly.',
        testimonial
      });
    }

    const { data, error } = await supabaseAdmin!
      .from('testimonials')
      .insert({
        name,
        title,
        message,
        is_approved: false,
        source: 'user'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating testimonial:', error);
      return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
    }
    
    console.log('New testimonial submitted:', data);
    
    // Send email notification (non-blocking)
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'your_resend_api_key_here') {
      sendTestimonialNotificationEmail(data).catch(emailError => {
        console.error('Email notification failed:', emailError);
      });
    } else {
      console.log('Email notification skipped - RESEND_API_KEY not configured');
    }
    
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
    if (usePrisma) {
      // Use production storage
      const pendingTestimonials = getPendingProductionTestimonials();
      return NextResponse.json(pendingTestimonials);
    }

    const { data, error } = await supabaseAdmin!
      .from('testimonials')
      .select('*')
      .eq('is_approved', false)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching pending testimonials:', error);
      return NextResponse.json({ error: 'Failed to fetch pending testimonials' }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error fetching pending testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch pending testimonials' }, { status: 500 });
  }
}
