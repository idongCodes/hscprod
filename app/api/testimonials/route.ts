import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, usePrisma } from '@/lib/supabase';
import { getApprovedProductionTestimonials, addProductionTestimonial } from '@/lib/production-storage';

export async function GET() {
  try {
    if (usePrisma) {
      // Use production storage
      const testimonials = getApprovedProductionTestimonials();
      return NextResponse.json(testimonials);
    }

    // Get only approved testimonials for public display
    const { data, error } = await supabaseAdmin!
      .from('testimonials')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching testimonials:', error);
      return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
    }

    return NextResponse.json(data || []);
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
    
    if (usePrisma) {
      // Use production storage
      const testimonial = addProductionTestimonial({
        name,
        title,
        message,
        is_approved: false,
        source: 'user'
      });
      
      return NextResponse.json({ 
        success: true, 
        message: 'Testimonial submitted successfully! It will appear on site once approved.',
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
      console.error('Error submitting testimonial:', error);
      return NextResponse.json({ error: 'Failed to submit testimonial' }, { status: 500 });
    }
    
    console.log('New testimonial submitted:', data);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Testimonial submitted successfully! It will appear on site once approved.',
      testimonial: data
    });
  } catch (error) {
    console.error('Error submitting testimonial:', error);
    return NextResponse.json({ error: 'Failed to submit testimonial' }, { status: 500 });
  }
}
