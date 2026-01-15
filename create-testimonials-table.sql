-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    source TEXT DEFAULT 'user',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert default testimonials
INSERT INTO testimonials (id, name, title, message, is_approved, source, created_at, updated_at) VALUES
    ('1', 'Yung Fader', 'Producer', 'The drum kits are absolutely lethal. Cleanest 808s I''ve ever used in a production. HSC really knows how to mix the low end.', TRUE, 'manual', NOW(), NOW()),
    ('2', 'Melody Queen', 'R&B Artist', 'HSC created a custom beat that fit my voice perfectly. The vibe in the studio is unmatched—he gets the best performance out of you.', TRUE, 'manual', NOW(), NOW()),
    ('3', 'Da Architect', 'Sound Engineer', 'Mixing these stems was a breeze. High quality recording and professional organization makes my life so much easier.', TRUE, 'manual', NOW(), NOW());
