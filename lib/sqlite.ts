import Database from 'better-sqlite3';
import path from 'path';

// Create database file in the project root
const dbPath = path.join(process.cwd(), 'hscprod.db');
export const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database tables
export function initializeDatabase() {
  // Audio tracks table
  db.exec(`
    CREATE TABLE IF NOT EXISTS audio_tracks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      genre TEXT NOT NULL,
      duration TEXT NOT NULL,
      price REAL NOT NULL,
      audio_url TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `);

  // Gallery media table
  db.exec(`
    CREATE TABLE IF NOT EXISTS gallery_media (
      id TEXT PRIMARY KEY,
      title TEXT,
      description TEXT,
      media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
      file_url TEXT NOT NULL,
      thumbnail_url TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `);

  // Testimonials table
  db.exec(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      is_approved INTEGER DEFAULT 0 CHECK (is_approved IN (0, 1)),
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `);

  // Contact submissions table
  db.exec(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded')),
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `);

  console.log('Database initialized successfully');
}

// Insert sample data if tables are empty
export function seedDatabase() {
  // Check if audio tracks table is empty
  const trackCount = db.prepare('SELECT COUNT(*) as count FROM audio_tracks').get() as { count: number };
  
  if (trackCount.count === 0) {
    const insertTrack = db.prepare(`
      INSERT INTO audio_tracks (id, title, genre, duration, price, audio_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const tracks = [
      ['1', 'Brooklyn Nights', 'NY Drill', '2:45', 29.99, '/audio/drill1.mp3'],
      ['2', 'Ops Outside', 'NY Drill', '3:10', 29.99, '/audio/drill2.mp3'],
      ['3', 'No Suburban', 'NY Drill', '2:55', 29.99, '/audio/drill3.mp3'],
      ['4', 'Glacier', 'NY Drill', '3:05', 34.99, '/audio/drill4.mp3'],
      ['5', 'Demon Time', 'NY Drill', '2:30', 29.99, '/audio/drill5.mp3'],
      ['6', 'Nightmare', 'Dark Trap', '3:20', 24.99, '/audio/trap1.mp3'],
      ['7', 'Shadow Realm', 'Dark Trap', '2:50', 24.99, '/audio/trap2.mp3'],
      ['8', 'Graveyard Shift', 'Dark Trap', '3:15', 29.99, '/audio/trap3.mp3'],
      ['9', 'Venom', 'Dark Trap', '2:40', 24.99, '/audio/trap4.mp3'],
      ['10', 'Abyss', 'Dark Trap', '3:30', 29.99, '/audio/trap5.mp3'],
      ['11', 'Club Luv', 'Jersey Club', '2:15', 19.99, '/audio/jersey1.mp3'],
      ['12', 'Bounce Back', 'Jersey Club', '2:10', 19.99, '/audio/jersey2.mp3'],
      ['13', 'Bed Squeak Anthem', 'Jersey Club', '2:20', 24.99, '/audio/jersey3.mp3'],
      ['14', 'Fast Life', 'Jersey Club', '2:05', 19.99, '/audio/jersey4.mp3'],
      ['15', 'Heartbeat', 'Jersey Club', '2:30', 24.99, '/audio/jersey5.mp3'],
    ];

    tracks.forEach(track => insertTrack.run(...track));
  }

  // Check if testimonials table is empty
  const testimonialCount = db.prepare('SELECT COUNT(*) as count FROM testimonials').get() as { count: number };
  
  if (testimonialCount.count === 0) {
    const insertTestimonial = db.prepare(`
      INSERT INTO testimonials (id, name, title, message, is_approved)
      VALUES (?, ?, ?, ?, ?)
    `);

    const testimonials = [
      ['1', 'Yung Fader', 'Producer', 'The drum kits are absolutely lethal. Cleanest 808s I\'ve ever used in a production. HSC really knows how to mix the low end.', 1],
      ['2', 'Melody Queen', 'R&B Artist', 'HSC created a custom beat that fit my voice perfectly. The vibe in the studio is unmatched—he gets the best performance out of you.', 1],
      ['3', 'Da Architect', 'Sound Engineer', 'Mixing these stems was a breeze. High quality recording and professional organization makes my life so much easier.', 1],
      ['4', 'Spitfire', 'Rapper', 'Bought a lease, recorded the track, and it\'s already doing numbers on Spotify. HSC production value is industry standard.', 1],
      ['5', 'Neon Keys', 'Producer', 'Collab was smooth. We sent files back and forth and made a banger in 48 hours. Looking forward to the next project.', 1],
      ['6', 'Vocalz Only', 'Artist', 'Finally found a producer who actually listens to the vision instead of just forcing their own style. 10/10 recommend.', 1],
    ];

    testimonials.forEach(testimonial => insertTestimonial.run(...testimonial));
  }

  console.log('Database seeded with sample data');
}

// Initialize on import
initializeDatabase();
seedDatabase();
