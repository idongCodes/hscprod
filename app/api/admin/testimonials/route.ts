import { NextRequest, NextResponse } from 'next/server';

const adminTestimonials: any[] = [];

export async function GET() {
  try {
    return NextResponse.json(adminTestimonials);
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
    
    const testimonial = adminTestimonials.find(t => t.id === id);
    
    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    
    testimonial.is_approved = action === 'approve' ? 1 : 0;
    
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
    
    const index = adminTestimonials.findIndex(t => t.id === id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    
    adminTestimonials.splice(index, 1);
    
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
