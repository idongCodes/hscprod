import { NextRequest, NextResponse } from 'next/server';
import { sendDeploymentEmail, deploymentSummaries } from '@/lib/deployment-email';

export async function POST(request: NextRequest) {
  try {
    const { type } = await request.json();
    
    if (!type || !deploymentSummaries[type as keyof typeof deploymentSummaries]) {
      return NextResponse.json({ error: 'Invalid deployment type' }, { status: 400 });
    }
    
    const summary = deploymentSummaries[type as keyof typeof deploymentSummaries];
    const date = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    await sendDeploymentEmail({
      ...summary,
      date
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Deployment email sent successfully' 
    });
  } catch (error) {
    console.error('Error sending deployment email:', error);
    return NextResponse.json({ 
      error: 'Failed to send deployment email' 
    }, { status: 500 });
  }
}
