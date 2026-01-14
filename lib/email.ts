import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendTestimonialNotificationEmail(
  testimonial: {
    name: string;
    title: string;
    message: string;
    created_at: string;
  }
) {
  if (!resend) {
    console.log('Email skipped - Resend not configured');
    return { success: false, error: 'Resend not configured' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'noreply@hscprod.com',
      to: 'huntercute13@gmail.com',
      subject: '🔥 New Testimonial Submitted - HSC Prod',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #9333ea; margin-bottom: 20px;">🔥 NEW TESTIMONIAL ALERT!</h2>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 10px 0; color: #1f2937;">${testimonial.name}</h3>
            <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">${testimonial.title}</p>
            <p style="margin: 0; color: #374151; font-style: italic;">"${testimonial.message}"</p>
          </div>
          
          <p style="color: #6b7280; margin-bottom: 20px;">
            Submitted: ${new Date(testimonial.created_at).toLocaleString()}
          </p>
          
          <div style="text-align: center;">
            <a href="https://hscprod.vercel.app" 
               style="background: #9333ea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              🚀 View Your Website
            </a>
          </div>
          
          <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 30px;">
            A new testimonial has been submitted! Check your admin dashboard to approve it.
          </p>
        </div>
      `
    });

    if (error) {
      console.error('Email error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
}

export async function sendFeatureUpdateEmail() {
  if (!resend) {
    console.log('Email skipped - Resend not configured');
    return { success: false, error: 'Resend not configured' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'noreply@hscprod.com',
      to: 'huntercute13@gmail.com',
      subject: '🔥 HSC PROD - NEW TESTIMONIAL SYSTEM DROPPED! 🔥',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #9333ea; text-align: center; margin-bottom: 30px;">
            🔥 HSC PROD - NEW TESTIMONIAL SYSTEM DROPPED! 🔥
          </h1>
          
          <h2 style="color: #1f2937;">✨ WHAT'S NEW:</h2>
          <ul style="color: #374151; line-height: 1.6;">
            <li>💬 <strong>Real Testimonial Submissions</strong> - Fans can now drop their honest reviews directly on the site! No cap!</li>
            <li>👨‍💼 <strong>Admin Dashboard</strong> - You got full control! Approve/reject testimonials with one click. Easy peasy!</li>
            <li>⚡ <strong>Live Updates</strong> - When someone submits a testimonial? BOOM! It pops up in your dashboard instantly. No refresh needed!</li>
            <li>🛡️ <strong>Spam Protection</strong> - Only approved testimonials show on the main page. Keep it clean, keep it real!</li>
            <li>📱 <strong>Mobile Friendly</strong> - Submit testimonials from anywhere. Phone, laptop, tablet - it just works!</li>
            <li>🎯 <strong>Professional Vibes</strong> - Makes you look legit! Real customer testimonials = instant trust boost!</li>
          </ul>
          
          <h2 style="color: #1f2937;">🚀 HOW IT WORKS:</h2>
          <ol style="color: #374151; line-height: 1.6;">
            <li><strong>Fan submits testimonial</strong> → Goes to your dashboard for approval</li>
            <li><strong>You approve</strong> → Testimonial goes live on the main site</li>
            <li><strong>You reject</strong> → Testimonial stays hidden (no hurt feelings!)</li>
          </ol>
          
          <h2 style="color: #1f2937;">💪 THE GLOW UP:</h2>
          <ul style="color: #374151; line-height: 1.6;">
            <li><strong>Before:</strong> Static testimonials (boring!)</li>
            <li><strong>After:</strong> Living, breathing testimonial system (vibes!)</li>
            <li><strong>Before:</strong> Manual updates (cringe!)</li>
            <li><strong>After:</strong> One-click approvals (slay!)</li>
            <li><strong>Before:</strong> No fan engagement (sad!)</li>
            <li><strong>After:</strong> Real customer voices (lit!)</li>
          </ul>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 10px; margin: 30px 0; text-align: center;">
            <h2 style="color: #92400e; margin: 0 0 10px 0;">🎉 BOTTOM LINE:</h2>
            <p style="color: #78350f; margin: 0;">
              Your HSC Prod site just got a MAJOR upgrade! Fans can now share their love for your beats, and you stay in full control. It's giving... professional music producer with raving reviews! 🎵✨
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://hscprod.vercel.app" 
               style="background: #9333ea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-size: 18px;">
              🚀 Check Out Your Website
            </a>
          </div>
          
          <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 30px;">
            Ready to collect those fire testimonials and watch your credibility skyrocket! 🚀🔥
          </p>
        </div>
      `
    });

    if (error) {
      console.error('Email error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
}

// Quick test function
export async function sendTestEmail() {
  if (!resend) {
    console.log('Email skipped - Resend not configured');
    return { success: false, error: 'Resend not configured' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'noreply@hscprod.com',
      to: 'huntercute13@gmail.com',
      subject: '🧪 Test Email - HSC Prod System',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
          <h2 style="color: #9333ea; margin-bottom: 20px;">🧪 Email System Test</h2>
          <p style="color: #374151;">Your HSC Prod email system is working perfectly! 🎉</p>
          <div style="margin: 30px 0;">
            <a href="https://hscprod.vercel.app" 
               style="background: #9333ea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              🚀 Visit Your Website
            </a>
          </div>
        </div>
      `
    });

    if (error) {
      console.error('Test email error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Test email error:', error);
    return { success: false, error };
  }
}
