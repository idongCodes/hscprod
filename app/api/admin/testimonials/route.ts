import { NextRequest, NextResponse } from 'next/server';
import { getTestimonials, updateTestimonial, deleteTestimonial } from '@/lib/testimonial-storage';

export async function GET() {
  try {
    const testimonials = getTestimonials();
    console.log('Admin API returning testimonials:', testimonials.length);
    return NextResponse.json(testimonials);
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
    
    const isApproved = action === 'approve' ? 1 : 0;
    const updated = updateTestimonial(id, { is_approved: isApproved });
    
    if (!updated) {
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
    
    const deleted = deleteTestimonial(id);
    
    if (!deleted) {
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
