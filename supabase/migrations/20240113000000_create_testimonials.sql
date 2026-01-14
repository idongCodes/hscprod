-- Create testimonials table
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  source TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Add performance indexes
CREATE INDEX idx_testimonials_approved ON testimonials(is_approved);
CREATE INDEX idx_testimonials_created_at ON testimonials(created_at DESC);

-- Insert sample data
INSERT INTO testimonials (name, title, message, is_approved, source) VALUES
  ('Yung Fader', 'Producer', 'The drum kits are absolutely lethal. Cleanest 808s I''ve ever used in a production. HSC really knows how to mix the low end.', true, 'manual'),
  ('Melody Queen', 'R&B Artist', 'HSC created a custom beat that fit my voice perfectly. The vibe in the studio is unmatched—he gets the best performance out of you.', true, 'manual'),
  ('Da Architect', 'Sound Engineer', 'Mixing these stems was a breeze. High quality recording and professional organization makes my life so much easier.', true, 'manual');

-- Enable Row Level Security (RLS)
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create policy for public to read approved testimonials
CREATE POLICY "Public can view approved testimonials" ON testimonials
  FOR SELECT USING (is_approved = true);

-- Create policy for service role to manage all testimonials
CREATE POLICY "Service role can manage testimonials" ON testimonials
  FOR ALL USING (auth.role() = 'service_role');
