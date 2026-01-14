import { Testimonial } from './testimonials';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

const STORAGE_FILE = join(process.cwd(), 'data', 'testimonials.json');

// Ensure data directory exists
import { mkdirSync } from 'fs';
const dataDir = join(process.cwd(), 'data');
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

// Initialize storage with default data if file doesn't exist
if (!existsSync(STORAGE_FILE)) {
  const defaultTestimonials: Testimonial[] = [
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
  writeFileSync(STORAGE_FILE, JSON.stringify(defaultTestimonials, null, 2));
}

export function getTestimonials(): Testimonial[] {
  try {
    if (existsSync(STORAGE_FILE)) {
      const data = readFileSync(STORAGE_FILE, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading testimonials:', error);
    return [];
  }
}

export function saveTestimonials(testimonials: Testimonial[]): void {
  try {
    writeFileSync(STORAGE_FILE, JSON.stringify(testimonials, null, 2));
  } catch (error) {
    console.error('Error saving testimonials:', error);
  }
}

export function addTestimonial(testimonial: Testimonial): void {
  const testimonials = getTestimonials();
  testimonials.unshift(testimonial);
  saveTestimonials(testimonials);
}

export function updateTestimonial(id: string, updates: Partial<Testimonial>): boolean {
  const testimonials = getTestimonials();
  const index = testimonials.findIndex(t => t.id === id);
  if (index !== -1) {
    testimonials[index] = { ...testimonials[index], ...updates, updated_at: new Date().toISOString() };
    saveTestimonials(testimonials);
    return true;
  }
  return false;
}

export function deleteTestimonial(id: string): boolean {
  const testimonials = getTestimonials();
  const index = testimonials.findIndex(t => t.id === id);
  if (index !== -1) {
    testimonials.splice(index, 1);
    saveTestimonials(testimonials);
    return true;
  }
  return false;
}
