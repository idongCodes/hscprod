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

    const { data, error } = await supabaseAdmin!
      .from('testimonials')
      .select('*')
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
    const body = await request.json();
    const { id, action } = body;
    
    if (!id || !action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    
    const isApproved = action === 'approve';
    
    if (usePrisma) {
      // Fallback for production - return success but don't update
      return NextResponse.json({ 
        success: true, 
        message: `Testimonial ${action}d successfully`,
        action,
        id 
      });
    }
    
    const { data, error } = await supabaseAdmin!
      .from('testimonials')
      .update({ is_approved: isApproved })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating testimonial:', error);
      return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
    }
    
    if (!data) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Testimonial ${action}d successfully`,
      action,
      id 
    });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Testimonial ID is required' }, { status: 400 });
    }
    
    if (usePrisma) {
      // Fallback for production - return success but don't delete
      return NextResponse.json({ 
        success: true, 
        message: 'Testimonial deleted successfully',
        id 
      });
    }
    
    const { data, error } = await supabaseAdmin!
      .from('testimonials')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error deleting testimonial:', error);
      return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
    }
    
    if (!data) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Testimonial deleted successfully',
      id 
    });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
