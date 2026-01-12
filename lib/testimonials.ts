export interface Testimonial {
  id: string;
  name: string;
  title: string;
  message: string;
  is_approved: boolean | number;
  created_at: string;
  updated_at: string;
  source?: string;
}

// Shared storage for all testimonials
export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Yung Fader',
    title: 'Producer',
    message: 'The drum kits are absolutely lethal. Cleanest 808s I\'ve ever used in a production. HSC really knows how to mix the low end.',
    is_approved: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    source: 'manual'
  },
  {
    id: '2',
    name: 'Melody Queen',
    title: 'R&B Artist',
    message: 'HSC created a custom beat that fit my voice perfectly. The vibe in the studio is unmatched—he gets the best performance out of you.',
    is_approved: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    source: 'manual'
  },
  {
    id: '3',
    name: 'Da Architect',
    title: 'Sound Engineer',
    message: 'Mixing these stems was a breeze. High quality recording and professional organization makes my life so much easier.',
    is_approved: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    source: 'manual'
  }
];
