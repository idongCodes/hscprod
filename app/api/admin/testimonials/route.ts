import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, usePrisma } from '@/lib/supabase';
import { 
  getProductionTestimonials, 
  updateProductionTestimonial, 
  deleteProductionTestimonial 
} from '@/lib/production-storage';

export async function GET() {
  try {
    console.log('Admin testimonials API called, usePrisma:', usePrisma);
    
    if (usePrisma) {
      // Use production storage
      const testimonials = getProductionTestimonials();
      console.log('Admin API returning testimonials:', testimonials.length, 'total');
      console.log('Pending testimonials:', testimonials.filter(t => t.is_approved === false).length);
      console.log('Approved testimonials:', testimonials.filter(t => t.is_approved === true).length);
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
      // Use production storage
      const updated = updateProductionTestimonial(id, { is_approved: isApproved });
      
      if (!updated) {
        return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
      }
      
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
      // Use production storage
      const deleted = deleteProductionTestimonial(id);
      
      if (!deleted) {
        return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
      }
      
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
