-- Create contact_submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  status TEXT DEFAULT 'pending', -- pending, reviewed, responded
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Add performance indexes
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for service role to manage all contact submissions
CREATE POLICY "Service role can manage contact submissions" ON contact_submissions
  FOR ALL USING (auth.role() = 'service_role');

-- Create policy for public to insert submissions (form submissions)
CREATE POLICY "Public can insert contact submissions" ON contact_submissions
  FOR INSERT WITH CHECK (auth.role() = 'service_role' OR auth.role() = 'anon');
