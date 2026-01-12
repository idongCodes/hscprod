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
const isProduction = process.env.NODE_ENV === 'production' || !!process.env.POSTGRES_URL;

let db: any;
let dbInitialized = false;

async function initializeDatabase() {
  if (dbInitialized) return db;
  
  // Debug: Log environment variables (without exposing sensitive data)
  console.log('Environment check:');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('POSTGRES_URL exists:', !!process.env.POSTGRES_URL);
  console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
  console.log('PRISMA_DATABASE_URL exists:', !!process.env.PRISMA_DATABASE_URL);
  
  // Try to get Postgres URL from multiple sources
  const postgresUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.PRISMA_DATABASE_URL;
  
  // Force Postgres in production when URL is available
  if (postgresUrl) {
    // Use Vercel Postgres in production
    console.log('Using Vercel Postgres in production');
    console.log('Postgres URL length:', postgresUrl.length);
    const pg = postgres(postgresUrl);
    
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
  } else if (isProduction) {
    // Production fallback - use hardcoded Postgres URL temporarily
    console.log('Environment variables not found, using hardcoded Postgres URL for production');
    const hardcodedUrl = 'postgres://bd82f343dc43c9556f7f7ace190e1826bff588a76fde2a47d7608de83f09eebe:sk_xB_Pw2vksNUmq1ODbC3qM@db.prisma.io:5432/postgres?sslmode=require';
    const pg = postgres(hardcodedUrl);
    
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
  } else if (isProduction) {
    // Production without Postgres - use in-memory storage with persistence
    console.log('Using in-memory storage for production (Postgres not configured)');
    
    // Simple in-memory database for production
    const memoryStore: { [key: string]: any } = {};
    
    // Initialize with sample data
    if (!memoryStore.testimonials) {
      memoryStore.testimonials = [
        { id: '1', name: 'Yung Fader', title: 'Producer', message: 'The drum kits are absolutely lethal. Cleanest 808s I\'ve ever used in a production. HSC really knows how to mix the low end.', is_approved: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: '2', name: 'Melody Queen', title: 'R&B Artist', message: 'HSC created a custom beat that fit my voice perfectly. The vibe in the studio is unmatched—he gets the best performance out of you.', is_approved: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: '3', name: 'Da Architect', title: 'Sound Engineer', message: 'Mixing these stems was a breeze. High quality recording and professional organization makes my life so much easier.', is_approved: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: '4', name: 'Spitfire', title: 'Rapper', message: 'Bought a lease, recorded the track, and it\'s already doing numbers on Spotify. HSC production value is industry standard.', is_approved: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: '5', name: 'Neon Keys', title: 'Producer', message: 'Collab was smooth. We sent files back and forth and made a banger in 48 hours. Looking forward to the next project.', is_approved: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: '6', name: 'Vocalz Only', title: 'Artist', message: 'Finally found a producer who actually listens to the vision instead of just forcing their own style. 10/10 recommend.', is_approved: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
      ];
    }
    
    db = {
      prepare: (query: string) => ({
        all: async (...params: any[]) => {
          if (query.includes('SELECT * FROM testimonials')) {
            return memoryStore.testimonials || [];
          }
          return [];
        },
        get: async (...params: any[]) => {
          if (query.includes('SELECT id FROM testimonials WHERE id = ?')) {
            return memoryStore.testimonials?.find((t: any) => t.id === params[0]) || null;
          }
          return null;
        },
        run: async (...params: any[]) => {
          if (query.includes('INSERT INTO testimonials')) {
            const newTestimonial = {
              id: params[0],
              name: params[1],
              title: params[2],
              message: params[3],
              is_approved: 0,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            };
            memoryStore.testimonials = [...(memoryStore.testimonials || []), newTestimonial];
            return { changes: 1 };
          }
          if (query.includes('UPDATE testimonials SET is_approved')) {
            const id = params[1];
            const isApproved = params[0];
            const testimonial = memoryStore.testimonials?.find((t: any) => t.id === id);
            if (testimonial) {
              testimonial.is_approved = isApproved;
              testimonial.updated_at = new Date().toISOString();
            }
            return { changes: 1 };
          }
          if (query.includes('DELETE FROM testimonials WHERE id = ?')) {
            const id = params[0];
            memoryStore.testimonials = memoryStore.testimonials?.filter((t: any) => t.id !== id) || [];
            return { changes: 1 };
          }
          return { changes: 0 };
        }
      })
    };
  } else {
    // Use SQLite in development ONLY
    if (isProduction) {
      console.error('ERROR: No database URL found in production! Cannot use SQLite in serverless environment.');
      console.error('Please set POSTGRES_URL, DATABASE_URL, or PRISMA_DATABASE_URL environment variables.');
      // Return a mock database that throws errors to prevent silent failures
      db = {
        prepare: (query: string) => ({
          all: async () => { throw new Error('Database not configured in production'); },
          get: async () => { throw new Error('Database not configured in production'); },
          run: async () => { throw new Error('Database not configured in production'); }
        })
      };
    } else {
      console.log('Using SQLite in development');
      db = sqliteDb;
    }
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
      const sampleData = [
        ['1', 'Yung Fader', 'Producer', 'The drum kits are absolutely lethal. Cleanest 808s I\'ve ever used in a production. HSC really knows how to mix the low end.', 1],
        ['2', 'Melody Queen', 'R&B Artist', 'HSC created a custom beat that fit my voice perfectly. The vibe in the studio is unmatched—he gets the best performance out of you.', 1],
        ['3', 'Da Architect', 'Sound Engineer', 'Mixing these stems was a breeze. High quality recording and professional organization makes my life so much easier.', 1],
        ['4', 'Spitfire', 'Rapper', 'Bought a lease, recorded the track, and it\'s already doing numbers on Spotify. HSC production value is industry standard.', 1],
        ['5', 'Neon Keys', 'Producer', 'Collab was smooth. We sent files back and forth and made a banger in 48 hours. Looking forward to the next project.', 1],
        ['6', 'Vocalz Only', 'Artist', 'Finally found a producer who actually listens to the vision instead of just forcing their own style. 10/10 recommend.', 1]
      ];
      
      for (const [id, name, title, message, is_approved] of sampleData) {
        await pg.unsafe('INSERT INTO testimonials (id, name, title, message, is_approved) VALUES ($1, $2, $3, $4, $5)', [id, name, title, message, is_approved]);
      }
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
