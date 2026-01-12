import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { phone, code } = await request.json();
    
    // Validate inputs
    if (!phone || !code) {
      return NextResponse.json(
        { error: 'Phone and code are required' },
        { status: 400 }
      );
    }
    
    // Get Vercel API token from environment
    const vercelToken = process.env.VERCEL_TOKEN;
    const projectId = process.env.VERCEL_PROJECT_ID;
    
    if (!vercelToken || !projectId) {
      return NextResponse.json(
        { 
          error: 'Vercel credentials not configured',
          message: 'Please add VERCEL_TOKEN and VERCEL_PROJECT_ID to your environment variables',
          setup: {
            steps: [
              '1. Go to Vercel Dashboard → Account Settings → Tokens',
              '2. Create a new API token',
              '3. Add VERCEL_TOKEN to your environment variables',
              '4. Add VERCEL_PROJECT_ID to your environment variables',
              '5. Restart your development server'
            ]
          }
        },
        { status: 400 }
      );
    }
    
    // Update Vercel environment variables
    const response = await fetch(`https://api.vercel.com/v1/projects/${projectId}/env`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${vercelToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        { key: 'ADMIN_PHONE', value: phone, target: ['production', 'preview', 'development'] },
        { key: 'ADMIN_CODE', value: code, target: ['production', 'preview', 'development'] }
      ]),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Vercel API error:', errorText);
      return NextResponse.json(
        { 
          error: 'Failed to update Vercel environment',
          details: errorText,
          status: response.status
        },
        { status: 500 }
      );
    }
    
    const result = await response.json();
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Credentials updated in Vercel',
        updated: result,
        note: 'Changes will be applied on next deployment'
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Failed to update Vercel credentials:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update credentials',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
