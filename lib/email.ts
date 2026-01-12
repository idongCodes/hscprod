import nodemailer from 'nodemailer';

// Create transporter using Gmail (you can use any email service)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export interface TestimonialData {
  id: string;
  name: string;
  title: string;
  message: string;
  created_at: string;
}

export async function sendTestimonialApprovalEmail(testimonial: TestimonialData) {
  const approveUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/testimonials/approve/html?id=${testimonial.id}&action=approve`;
  const rejectUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/testimonials/approve/html?id=${testimonial.id}&action=reject`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'idongesit_essien@ymail.com',
    subject: `New Testimonial Approval Request - ${testimonial.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333; border-bottom: 2px solid #6b46c1; padding-bottom: 10px;">
          New Testimonial Submission
        </h2>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${testimonial.name}</p>
          <p style="margin: 0 0 10px 0;"><strong>Title:</strong> ${testimonial.title}</p>
          <p style="margin: 0 0 10px 0;"><strong>Message:</strong></p>
          <p style="background: white; padding: 10px; border-radius: 4px; border-left: 4px solid #6b46c1; margin: 0;">
            "${testimonial.message}"
          </p>
          <p style="margin: 10px 0 0 0; color: #666; font-size: 12px;">
            <strong>Submitted:</strong> ${new Date(testimonial.created_at).toLocaleString()}
          </p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <p style="margin: 0 0 15px 0; color: #333;">
            <strong>Approve or reject this testimonial:</strong>
          </p>
          
          <div style="display: flex; gap: 15px; justify-content: center;">
            <a href="${approveUrl}" 
               style="background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              ✅ Approve
            </a>
            
            <a href="${rejectUrl}" 
               style="background: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              ❌ Reject
            </a>
          </div>
          
          <p style="margin: 20px 0 0 0; color: #666; font-size: 11px;">
            These links will expire in 7 days. Clicking will update the testimonial status automatically.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Testimonial approval email sent successfully');
  } catch (error) {
    console.error('Error sending testimonial approval email:', error);
    throw error;
  }
}
