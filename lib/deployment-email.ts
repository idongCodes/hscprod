import nodemailer from 'nodemailer';

interface DeploymentSummary {
  version: string;
  features: string[];
  fixes: string[];
  improvements: string[];
  date: string;
}

export function generateDeploymentEmail(summary: DeploymentSummary): string {
  const { version, features, fixes, improvements, date } = summary;
  
  let emailContent = `
🎵 HSC Production Update - ${version}
📅 ${date}

Hi there! Here's what's new with your HSC website:

`;

  if (features.length > 0) {
    emailContent += `
✨ New Features:
${features.map(feature => `• ${feature}`).join('\n')}
`;
  }

  if (fixes.length > 0) {
    emailContent += `
🔧 Fixes & Improvements:
${fixes.map(fix => `• ${fix}`).join('\n')}
`;
  }

  if (improvements.length > 0) {
    emailContent += `
⚡ Performance Updates:
${improvements.map(improvement => `• ${improvement}`).join('\n')}
`;
  }

  emailContent += `
🚀 Your website is now running better than ever!

Need anything else? Just let me know!

Best regards,
Idong Essien
Developer | HSC Production
`;

  return emailContent;
}

export async function sendDeploymentEmail(summary: DeploymentSummary) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailContent = generateDeploymentEmail(summary);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'huntercute13@gmail.com',
    subject: `🎵 HSC Website Update - ${summary.version}`,
    html: emailContent.replace(/\n/g, '<br>'),
    text: emailContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Deployment email sent successfully');
  } catch (error) {
    console.error('❌ Failed to send deployment email:', error);
  }
}

// Pre-defined deployment summaries for common updates
export const deploymentSummaries = {
  testimonialSystem: {
    version: 'v2.0',
    features: [
      'Complete testimonial management system for admin dashboard',
      'Custom confirmation dialogs for delete actions',
      'Email notifications for new testimonial submissions'
    ],
    fixes: [
      'Fixed testimonial approval/rejection functionality',
      'Resolved database issues in production environment',
      'Fixed testimonial submission form errors'
    ],
    improvements: [
      'Enhanced admin dashboard with better user experience',
      'Improved error handling and logging',
      'Optimized database performance'
    ]
  },
  databaseFix: {
    version: 'v2.0',
    features: [],
    fixes: [
      'Fixed production database readonly errors',
      'Resolved testimonial creation failures',
      'Fixed missing testimonials on admin dashboard'
    ],
    improvements: [
      'Upgraded to cloud database for better reliability',
      'Enhanced system stability and performance'
    ]
  }
};
