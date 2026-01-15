import fs from 'fs';
import path from 'path';

interface Testimonial {
  id: string;
  name: string;
  title: string;
  message: string;
  is_approved: boolean;
  source: string;
  created_at: string;
  updated_at: string;
}

// File path for persistent storage
const STORAGE_FILE = path.join(process.cwd(), 'data', 'testimonials.json');

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.dirname(STORAGE_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read testimonials from file
function readTestimonialsFromFile(): Testimonial[] {
  try {
    ensureDataDirectory();
    if (fs.existsSync(STORAGE_FILE)) {
      const data = fs.readFileSync(STORAGE_FILE, 'utf-8');
      return JSON.parse(data);
    }
    
    // Return default testimonials if file doesn't exist
    return [
      {
        id: "1",
        name: "Yung Fader",
        title: "Producer",
        message: "The drum kits are absolutely lethal. Cleanest 808s I've ever used in a production. HSC really knows how to mix the low end.",
        is_approved: true,
        source: 'manual',
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z"
      },
      {
        id: "2",
        name: "Melody Queen",
        title: "R&B Artist",
        message: "HSC created a custom beat that fit my voice perfectly. The vibe in the studio is unmatched—he gets the best performance out of you.",
        is_approved: true,
        source: 'manual',
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z"
      },
      {
        id: "3",
        name: "Da Architect",
        title: "Sound Engineer",
        message: "Mixing these stems was a breeze. High quality recording and professional organization makes my life so much easier.",
        is_approved: true,
        source: 'manual',
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z"
      }
    ];
  } catch (error) {
    console.error('Error reading testimonials from file:', error);
    return [];
  }
}

// Write testimonials to file
function writeTestimonialsToFile(testimonials: Testimonial[]): void {
  try {
    ensureDataDirectory();
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(testimonials, null, 2));
    console.log('Testimonials saved to file:', testimonials.length, 'total');
  } catch (error) {
    console.error('Error writing testimonials to file:', error);
  }
}

// Initialize testimonials with default data
export function getPersistentTestimonials(): Testimonial[] {
  console.log('Getting persistent testimonials from file');
  return readTestimonialsFromFile();
}

export function addPersistentTestimonial(testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>): Testimonial {
  const testimonials = readTestimonialsFromFile();
  const newTestimonial: Testimonial = {
    ...testimonial,
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  // Add to beginning of array (newest first)
  testimonials.unshift(newTestimonial);
  
  // Save to file
  writeTestimonialsToFile(testimonials);
  
  console.log('Added testimonial to persistent storage:', newTestimonial);
  return newTestimonial;
}

export function updatePersistentTestimonial(id: string, updates: Partial<Testimonial>): Testimonial | null {
  const testimonials = readTestimonialsFromFile();
  const index = testimonials.findIndex(t => t.id === id);
  
  if (index === -1) return null;
  
  testimonials[index] = {
    ...testimonials[index],
    ...updates,
    updated_at: new Date().toISOString()
  };
  
  // Save to file
  writeTestimonialsToFile(testimonials);
  
  console.log('Updated testimonial in persistent storage:', testimonials[index]);
  return testimonials[index];
}

export function deletePersistentTestimonial(id: string): Testimonial | null {
  const testimonials = readTestimonialsFromFile();
  const index = testimonials.findIndex(t => t.id === id);
  
  if (index === -1) return null;
  
  const deleted = testimonials.splice(index, 1)[0];
  
  // Save to file
  writeTestimonialsToFile(testimonials);
  
  console.log('Deleted testimonial from persistent storage:', deleted);
  return deleted;
}

export function getPendingPersistentTestimonials(): Testimonial[] {
  const testimonials = readTestimonialsFromFile();
  return testimonials.filter(t => t.is_approved === false);
}

export function getApprovedPersistentTestimonials(): Testimonial[] {
  const testimonials = readTestimonialsFromFile();
  return testimonials.filter(t => t.is_approved === true);
}
