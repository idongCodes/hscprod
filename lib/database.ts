import { db } from './sqlite';
import { sendTestimonialApprovalEmail } from './email';

export interface AudioTrack {
  id: string;
  title: string;
  genre: string;
  duration: string;
  price: number;
  audio_url: string;
  created_at: string;
  updated_at: string;
}

export interface GalleryMedia {
  id: string;
  title?: string;
  description?: string;
  media_type: 'image' | 'video';
  file_url: string;
  thumbnail_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  message: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'responded';
  created_at: string;
  updated_at: string;
}

// Audio tracks
export async function getAudioTracks(): Promise<AudioTrack[]> {
  const stmt = db.prepare('SELECT * FROM audio_tracks ORDER BY created_at DESC');
  return stmt.all() as AudioTrack[];
}

export async function createAudioTrack(track: Omit<AudioTrack, 'id' | 'created_at' | 'updated_at'>): Promise<AudioTrack> {
  const id = Date.now().toString();
  const now = new Date().toISOString();
  
  const stmt = db.prepare(`
    INSERT INTO audio_tracks (id, title, genre, duration, price, audio_url, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  stmt.run(id, track.title, track.genre, track.duration, track.price, track.audio_url, now, now);
  
  return {
    id,
    ...track,
    created_at: now,
    updated_at: now
  };
}

// Gallery media
export async function getGalleryMedia(): Promise<GalleryMedia[]> {
  const stmt = db.prepare('SELECT * FROM gallery_media ORDER BY created_at DESC');
  return stmt.all() as GalleryMedia[];
}

export async function createGalleryMedia(media: Omit<GalleryMedia, 'id' | 'created_at' | 'updated_at'>): Promise<GalleryMedia> {
  const id = Date.now().toString();
  const now = new Date().toISOString();
  
  const stmt = db.prepare(`
    INSERT INTO gallery_media (id, title, description, media_type, file_url, thumbnail_url, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  stmt.run(id, media.title, media.description, media.media_type, media.file_url, media.thumbnail_url, now, now);
  
  return {
    id,
    ...media,
    created_at: now,
    updated_at: now
  };
}

// Testimonials
export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  const stmt = db.prepare('SELECT * FROM testimonials WHERE is_approved = 1 ORDER BY created_at DESC');
  return stmt.all() as Testimonial[];
}

export async function createTestimonial(testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at' | 'is_approved'>): Promise<Testimonial> {
  const id = Date.now().toString();
  const now = new Date().toISOString();
  
  const stmt = db.prepare(`
    INSERT INTO testimonials (id, name, title, message, is_approved, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  
  stmt.run(id, testimonial.name, testimonial.title, testimonial.message, 0, now, now);
  
  const newTestimonial = {
    id,
    ...testimonial,
    is_approved: false,
    created_at: now,
    updated_at: now
  };

  // Send approval email
  try {
    await sendTestimonialApprovalEmail(newTestimonial);
  } catch (error) {
    console.error('Failed to send approval email:', error);
  }

  return newTestimonial;
}

// Contact submissions
export async function createContactSubmission(submission: Omit<ContactSubmission, 'id' | 'created_at' | 'updated_at' | 'status'>): Promise<ContactSubmission> {
  const id = Date.now().toString();
  const now = new Date().toISOString();
  
  const stmt = db.prepare(`
    INSERT INTO contact_submissions (id, name, email, message, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  
  stmt.run(id, submission.name, submission.email, submission.message, 'new', now, now);
  
  return {
    id,
    ...submission,
    status: 'new',
    created_at: now,
    updated_at: now
  };
}
