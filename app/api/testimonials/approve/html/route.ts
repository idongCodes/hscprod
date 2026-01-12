import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const action = searchParams.get('action');

  if (!id || !action || !['approve', 'reject'].includes(action)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  // Create HTML response for email approval
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Testimonial ${action === 'approve' ? 'Approved' : 'Rejected'}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          margin: 0;
          padding: 40px 20px;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .container {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          text-align: center;
          max-width: 500px;
          width: 100%;
        }
        .icon {
          font-size: 48px;
          margin-bottom: 20px;
        }
        h1 {
          color: #333;
          margin: 0 0 10px 0;
          font-size: 24px;
        }
        p {
          color: #666;
          margin: 10px 0;
          line-height: 1.5;
        }
        .testimonial {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
          text-align: left;
          border-left: 4px solid ${action === 'approve' ? '#28a745' : '#dc3545'};
        }
        .testimonial-text {
          font-style: italic;
          margin: 10px 0;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          font-size: 14px;
          color: #999;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="icon">
          ${action === 'approve' ? '✅' : '❌'}
        </div>
        <h1>Testimonial ${action === 'approve' ? 'Approved' : 'Rejected'}</h1>
        <p>The testimonial has been successfully ${action === 'approve' ? 'approved and will now appear on the website' : 'rejected and will not be displayed'}.</p>
        
        <div class="testimonial">
          <p><strong>Status:</strong> ${action === 'approve' ? '✅ Approved' : '❌ Rejected'}</p>
          <p><strong>Action taken:</strong> ${action === 'approve' ? 'Testimonial will be visible to all visitors' : 'Testimonial will remain hidden'}</p>
        </div>
        
        <div class="footer">
          <p>This is an automated response from HSC Prod website.</p>
          <p>You can close this window now.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
