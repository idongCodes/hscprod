-- Insert default testimonials into existing table
INSERT INTO testimonials (id, name, title, message, is_approved, created_at, updated_at) VALUES
    ('1', 'Yung Fader', 'Producer', 'The drum kits are absolutely lethal. Cleanest 808s I''ve ever used in a production. HSC really knows how to mix the low end.', 1, NOW(), NOW()),
    ('2', 'Melody Queen', 'R&B Artist', 'HSC created a custom beat that fit my voice perfectly. The vibe in the studio is unmatched—he gets the best performance out of you.', 1, NOW(), NOW()),
    ('3', 'Da Architect', 'Sound Engineer', 'Mixing these stems was a breeze. High quality recording and professional organization makes my life so much easier.', 1, NOW(), NOW());
