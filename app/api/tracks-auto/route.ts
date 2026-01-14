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
  created_at: string;
  updated_at: string;
}

// Function to scan audio files from public folder (supports MP3, WAV, FLAC)
async function scanAudioFiles(): Promise<AudioTrack[]> {
  try {
    const publicPath = path.join(process.cwd(), 'public', 'audio');
    const beatsPath = path.join(publicPath, 'beats');
    const songsPath = path.join(publicPath, 'songs');
    
    const tracks: AudioTrack[] = [];
    let idCounter = 1;

    // Scan beats folder
    if (fs.existsSync(beatsPath)) {
      const beatFiles = fs.readdirSync(beatsPath).filter(file => 
        file.endsWith('.mp3') || file.endsWith('.wav') || file.endsWith('.flac')
      );
      
      beatFiles.forEach((file, index) => {
        const fileName = path.parse(file).name;
        tracks.push({
          id: idCounter.toString(),
          title: fileName.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          genre: 'Beats',
          duration: '3:00',
          price: 35.00,
          audio_url: `/audio/beats/${file}`,
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
      
      songFiles.forEach((file, index) => {
        const fileName = path.parse(file).name;
        tracks.push({
          id: idCounter.toString(),
          title: fileName.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          genre: 'Songs',
          duration: '3:30',
          price: 45.00,
          audio_url: `/audio/songs/${file}`,
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

export async function GET() {
  try {
    const tracks = await scanAudioFiles();
    console.log(`Loaded ${tracks.length} audio files from public folder`);
    return NextResponse.json(tracks);
  } catch (error) {
    console.error('Error fetching audio tracks:', error);
    return NextResponse.json({ error: 'Failed to fetch audio tracks' }, { status: 500 });
  }
}
