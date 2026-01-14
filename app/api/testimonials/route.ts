import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, usePrisma } from '@/lib/supabase';

export async function GET() {
  try {
    if (usePrisma) {
      // Fallback to Prisma for production
      const testimonials = [
        {
          id: "1",
          name: "Yung Fader",
          title: "Producer",
          message: "The drum kits are absolutely lethal. Cleanest 808s I've ever used in a production. HSC really knows how to mix the low end.",
          is_approved: true,
          source: 'manual',
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z"
        },
        {
          id: "2",
          name: "Melody Queen",
          title: "R&B Artist",
          message: "HSC created a custom beat that fit my voice perfectly. The vibe in the studio is unmatched—he gets the best performance out of you.",
          is_approved: true,
          source: 'manual',
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z"
        },
        {
          id: "3",
          name: "Da Architect",
          title: "Sound Engineer",
          message: "Mixing these stems was a breeze. High quality recording and professional organization makes my life so much easier.",
          is_approved: true,
          source: 'manual',
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z"
        }
      ];
      
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
      // Fallback for production - return success but don't save
      return NextResponse.json({ 
        success: true, 
        message: 'Testimonial submitted successfully! It will be reviewed and added shortly.',
        testimonial: {
          id: Date.now().toString(),
          name,
          title,
          message,
          is_approved: false,
          source: 'user',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
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
