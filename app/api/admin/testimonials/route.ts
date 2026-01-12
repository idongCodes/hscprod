import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/sqlite';

export async function GET() {
  try {
    // Get all testimonials (both approved and pending)
    const stmt = db.prepare('SELECT * FROM testimonials ORDER BY created_at DESC');
    const testimonials = stmt.all();
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('POST request body:', body);
    
    const { id, action } = body;
    
    if (!id || !action || !['approve', 'reject'].includes(action)) {
      console.log('Invalid request - id:', id, 'action:', action);
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    
    const isApproved = action === 'approve' ? 1 : 0;
    console.log('Updating testimonial:', id, 'to is_approved:', isApproved);
    
    // Check if testimonial exists first
    const checkStmt = db.prepare('SELECT id FROM testimonials WHERE id = ?');
    const existing = checkStmt.get(id);
    console.log('Existing testimonial:', existing);
    
    if (!existing) {
      console.log('Testimonial not found:', id);
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    
    const stmt = db.prepare('UPDATE testimonials SET is_approved = ?, updated_at = datetime(\'now\') WHERE id = ?');
    const result = stmt.run(isApproved, id);
    console.log('Update result:', result);
    
    if (result.changes === 0) {
      console.log('No changes made for testimonial:', id);
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    
    const response = NextResponse.json({ 
      success: true, 
      message: `Testimonial ${action}d successfully`,
      action,
      id 
    });
    console.log('Success response:', response);
    return response;
  } catch (error) {
    console.error('Error updating testimonial:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack available');
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
    
    const stmt = db.prepare('DELETE FROM testimonials WHERE id = ?');
    const result = stmt.run(id);
    
    if (result.changes === 0) {
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
