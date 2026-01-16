import { NextResponse } from 'next/server';

export async function GET() {
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
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        message: 'Love your production quality. Would like to discuss a project.',
        status: 'reviewed',
        ip_address: '192.168.1.2',
        user_agent: 'Chrome/120.0...',
        created_at: new Date(Date.now() - 86400000).toISOString() // 1 day ago
      }
    ];
    
    return NextResponse.json({
      submissions,
      total: submissions.length,
      pending: submissions.filter(s => s.status === 'pending').length,
      reviewed: submissions.filter(s => s.status === 'reviewed').length
    });
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch submissions' 
    }, { status: 500 });
  }
}
