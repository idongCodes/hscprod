import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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
    
    // Update .env.local file
    const envPath = path.join(process.cwd(), '.env.local');
    const envContent = `ADMIN_PHONE="${phone}"\nADMIN_CODE="${code}"\n`;
    
    fs.writeFileSync(envPath, envContent, 'utf8');
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Credentials updated successfully',
        note: 'Restart dev server to apply changes'
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Failed to update credentials:', error);
    return NextResponse.json(
      { error: 'Failed to update credentials' },
      { status: 500 }
    );
  }
}
