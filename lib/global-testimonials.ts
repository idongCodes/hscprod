import { Testimonial } from './testimonials';

// Global in-memory storage that persists across API calls in the same server instance
declare global {
  var globalTestimonials: Testimonial[] | undefined;
}

// Initialize global storage if it doesn't exist
if (!global.globalTestimonials) {
  global.globalTestimonials = [
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
}

export function getGlobalTestimonials(): Testimonial[] {
  return global.globalTestimonials || [];
}

export function addGlobalTestimonial(testimonial: Testimonial): void {
  if (global.globalTestimonials) {
    global.globalTestimonials.unshift(testimonial);
  }
}

export function updateGlobalTestimonial(id: string, updates: Partial<Testimonial>): boolean {
  if (global.globalTestimonials) {
    const index = global.globalTestimonials.findIndex(t => t.id === id);
    if (index !== -1) {
      global.globalTestimonials[index] = { 
        ...global.globalTestimonials[index], 
        ...updates, 
        updated_at: new Date().toISOString() 
      };
      return true;
    }
  }
  return false;
}

export function deleteGlobalTestimonial(id: string): boolean {
  if (global.globalTestimonials) {
    const index = global.globalTestimonials.findIndex(t => t.id === id);
    if (index !== -1) {
      global.globalTestimonials.splice(index, 1);
      return true;
    }
  }
  return false;
}
