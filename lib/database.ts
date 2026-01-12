import { db as sqliteDb } from './sqlite';
import { sendTestimonialApprovalEmail } from './email';
import postgres from 'postgres';

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

// Database adapter that works with both SQLite (dev) and Postgres (prod)
const isProduction = process.env.NODE_ENV === 'production';

let db: any;
let dbInitialized = false;

async function initializeDatabase() {
  if (dbInitialized) return db;
  
  if (isProduction && process.env.POSTGRES_URL) {
    // Use Vercel Postgres in production
    console.log('Using Vercel Postgres in production');
    const pg = postgres(process.env.POSTGRES_URL);
    
    // Initialize Postgres tables if needed
    await initializePostgresDatabase(pg);
    
    db = {
      prepare: (query: string) => ({
        all: async (...params: any[]) => {
          const result = await pg.unsafe(query, ...params);
          return result;
        },
        get: async (...params: any[]) => {
          const result = await pg.unsafe(query, ...params);
          return result[0];
        },
        run: async (...params: any[]) => {
          await pg.unsafe(query, ...params);
          return { changes: 1 };
        }
      })
    };
  } else {
    // Use SQLite in development
    console.log('Using SQLite in development');
    db = sqliteDb;
  }
  
  dbInitialized = true;
  return db;
}

async function initializePostgresDatabase(pg: any) {
  try {
    // Create testimonials table
    await pg.unsafe(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        is_approved INTEGER DEFAULT 0,
        created_at TEXT DEFAULT NOW(),
        updated_at TEXT DEFAULT NOW()
      )
    `);

    // Insert sample data if table is empty
    const existing = await pg.unsafe('SELECT COUNT(*) as count FROM testimonials');
    if (existing[0].count === 0) {
      await pg.unsafe(`
        INSERT INTO testimonials (id, name, title, message, is_approved) VALUES
        ('1', 'Yung Fader', 'Producer', 'The drum kits are absolutely lethal. Cleanest 808s I''ve ever used in a production. HSC really knows how to mix the low end.', 1),
        ('2', 'Melody Queen', 'R&B Artist', 'HSC created a custom beat that fit my voice perfectly. The vibe in the studio is unmatched—he gets the best performance out of you.', 1),
        ('3', 'Da Architect', 'Sound Engineer', 'Mixing these stems was a breeze. High quality recording and professional organization makes my life so much easier.', 1),
        ('4', 'Spitfire', 'Rapper', 'Bought a lease, recorded the track, and it''s already doing numbers on Spotify. HSC production value is industry standard.', 1),
        ('5', 'Neon Keys', 'Producer', 'Collab was smooth. We sent files back and forth and made a banger in 48 hours. Looking forward to the next project.', 1),
        ('6', 'Vocalz Only', 'Artist', 'Finally found a producer who actually listens to the vision instead of just forcing their own style. 10/10 recommend.', 1)
      `);
    }
    
    console.log('Postgres database initialized successfully');
  } catch (error) {
    console.error('Error initializing Postgres database:', error);
  }
}

// Export a function that ensures database is initialized
export async function getDatabase() {
  return await initializeDatabase();
}

// Export db for backward compatibility (will be initialized on first use)
export { db };

// Audio tracks
export async function getAudioTracks(): Promise<AudioTrack[]> {
  const db = await getDatabase();
  const stmt = db.prepare('SELECT * FROM audio_tracks ORDER BY created_at DESC');
  return stmt.all() as AudioTrack[];
}

export async function createAudioTrack(track: Omit<AudioTrack, 'id' | 'created_at' | 'updated_at'>): Promise<AudioTrack> {
  const db = await getDatabase();
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

  // Send approval email (skip in serverless environments if it fails)
  try {
    await sendTestimonialApprovalEmail(newTestimonial);
  } catch (error) {
    console.error('Email sending failed (this is expected in serverless environments):', error);
    // Don't throw error - testimonial is still saved successfully
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
