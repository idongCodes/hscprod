import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface AudioTrack {
  id: string;
  title: string;
  genre: string;
  duration: string;
  price: number;
  audio_url: string;
  artist_image?: string;
  created_at: string;
  updated_at: string;
}

// Function to scan audio files from public folder (supports MP3, WAV, FLAC)
async function scanAudioFiles(): Promise<AudioTrack[]> {
  try {
    const publicPath = path.join(process.cwd(), 'public', 'audio');
    const beatsPath = path.join(publicPath, 'beats');
    const songsPath = path.join(publicPath, 'songs');
    const artistsPath = path.join(process.cwd(), 'public', 'images', 'artists');
    
    const tracks: AudioTrack[] = [];
    let idCounter = 1;

    // Load artist images for matching
    const artistImages: { [key: string]: string } = {};
    if (fs.existsSync(artistsPath)) {
      const artistFiles = fs.readdirSync(artistsPath).filter(file => 
        file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg')
      );
      
      artistFiles.forEach(file => {
        const fileName = path.parse(file).name;
        artistImages[fileName.toLowerCase().replace(/[^a-z0-9]/g, '')] = `/images/artists/${file}`;
      });
    }

    // Scan beats folder
    if (fs.existsSync(beatsPath)) {
      const beatFiles = fs.readdirSync(beatsPath).filter(file => 
        file.endsWith('.mp3') || file.endsWith('.wav') || file.endsWith('.flac')
      );
      
      beatFiles.forEach((file) => {
        const fileName = path.parse(file).name;
        
        tracks.push({
          id: idCounter.toString(),
          title: fileName.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          genre: 'Beats',
          duration: '3:00',
          price: 35.00,
          audio_url: `/audio/beats/${file}`,
          artist_image: '', // No artist images for beats
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
        idCounter++;
      });
    }

    // Scan songs folder
    if (fs.existsSync(songsPath)) {
      const songFiles = fs.readdirSync(songsPath).filter(file => 
        file.endsWith('.mp3') || file.endsWith('.wav') || file.endsWith('.flac')
      );
      
      songFiles.forEach((file) => {
        const fileName = path.parse(file).name;
        const artistName = extractArtistName(fileName);
        const artistImage = findArtistImage(artistName, artistImages);
        
        tracks.push({
          id: idCounter.toString(),
          title: fileName.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          genre: 'Songs',
          duration: '3:30',
          price: 45.00,
          audio_url: `/audio/songs/${file}`,
          artist_image: artistImage,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
        idCounter++;
      });
    }

    return tracks;
  } catch (error) {
    console.error('Error scanning audio files:', error);
    return [];
  }
}

// Function to extract artist name from filename
function extractArtistName(fileName: string): string {
  // Remove common patterns and extract clean name for matching
  let cleanName = fileName
    .toLowerCase()
    .replace(/[-_]/g, ' ')
    .replace(/\d+/g, '') // Remove numbers
    .replace(/[^a-z\s]/g, '') // Keep only letters and spaces
    .trim();
  
  // Capitalize first letter of each word
  cleanName = cleanName.replace(/\b\w/g, l => l.toUpperCase());
  
  // Remove production credits at the end
  cleanName = cleanName.replace(/\s*\(.*?\)\s*$/, '').trim();
  cleanName = cleanName.replace(/\s*-\s*prod.*$/, '').trim();
  cleanName = cleanName.replace(/\s*by\s*hsc.*$/, '').trim();
  
  return cleanName.toLowerCase().trim();
}

// Function to find best matching artist image
function findArtistImage(artistName: string, artistImages: { [key: string]: string }): string {
  // Direct match
  if (artistImages[artistName]) {
    return artistImages[artistName];
  }
  
  // Fuzzy matching - check various patterns
  for (const [imageKey, imagePath] of Object.entries(artistImages)) {
    const cleanImageKey = imageKey.toLowerCase().replace(/[^a-z]/g, '');
    
    // Check if artist name is contained in image filename
    if (artistName.includes(cleanImageKey) || cleanImageKey.includes(artistName)) {
      return imagePath;
    }
    
    // Check partial matches (first 3-4 characters)
    if (artistName.length >= 3) {
      const partial = artistName.substring(0, 4);
      if (cleanImageKey.includes(partial) || partial.includes(cleanImageKey)) {
        return imagePath;
      }
    }
    
    // Check if any word from artist name matches
    const artistWords = artistName.split(/\s+/);
    for (const word of artistWords) {
      const cleanWord = word.replace(/[^a-z]/g, '');
      if (cleanImageKey.includes(cleanWord) || cleanWord.includes(cleanImageKey)) {
        return imagePath;
      }
    }
    
    // Special case handling for common variations
    if (artistName.includes('tay') && imageKey.includes('tay')) {
      return imagePath;
    }
    if (artistName.includes('rich') && imageKey.includes('rich')) {
      return imagePath;
    }
    if (artistName.includes('rixh') && imageKey.includes('rich')) {
      return imagePath;
    }
  }
  
  return '';
}

export async function GET() {
  try {
    const tracks = await scanAudioFiles();
    return NextResponse.json(tracks);
  } catch (error) {
    console.error('Error fetching audio tracks:', error);
    return NextResponse.json({ error: 'Failed to fetch audio tracks' }, { status: 500 });
  }
}
