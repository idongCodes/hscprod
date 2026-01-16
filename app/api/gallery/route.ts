import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Supported media file extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
const VIDEO_EXTENSIONS = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.wmv', '.flv'];

// Function to scan directory for media files
function scanMediaFiles(directory: string, baseUrl: string): any[] {
  const mediaItems: any[] = [];
  
  try {
    const files: string[] = fs.readdirSync(directory);
    
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = fs.statSync(filePath);
      
      // Skip directories and files with "logo" in name (case insensitive, but allow HSC logo)
      if (stat.isDirectory() || (file.toLowerCase().includes('logo') && !file.toLowerCase().includes('hsc_logo'))) {
        continue;
      }
      
      const ext = path.extname(file).toLowerCase();
      
      // Check if file is a supported media type
      if (IMAGE_EXTENSIONS.includes(ext) || VIDEO_EXTENSIONS.includes(ext)) {
        const mediaType = IMAGE_EXTENSIONS.includes(ext) ? 'image' : 'video';
        
        // Generate a nice title from filename
        let title = file
          .replace(/\.[^/.]+$/, '') // Remove extension
          .replace(/[-_]/g, ' ') // Replace hyphens and underscores with spaces
          .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize first letter of each word
        
        // Clean up common patterns
        title = title
          .replace(/Img /g, 'Image ') // Make "Img" more readable
          .replace(/IMG /g, 'Image ') // Make "IMG" more readable
          .replace(/F6DAF43D 0934 454E A849 C6E6540A62AC/g, 'Studio Video') // Give the video a better name
          .replace(/Third Shift Bball/g, 'Third Shift Basketball'); // Fix basketball title
        
        mediaItems.push({
          id: file.replace(/[^a-zA-Z0-9]/g, '_'), // Create safe ID
          title: title,
          media_type: mediaType,
          file_url: `${baseUrl}/${file}`,
          thumbnail_url: mediaType === 'video' ? `${baseUrl}/${file}` : undefined,
          description: `Media file: ${file}`
        });
      }
    }
  } catch (error) {
    console.error('Error scanning directory:', directory, error);
  }
  
  return mediaItems;
}

export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    const videosDir = path.join(process.cwd(), 'public', 'videos');
    
    const galleryMedia = [];
    
    // Scan images directory
    if (fs.existsSync(imagesDir)) {
      const images = scanMediaFiles(imagesDir, '/images');
      galleryMedia.push(...images);
    }
    
    // Scan videos directory if it exists
    if (fs.existsSync(videosDir)) {
      const videos = scanMediaFiles(videosDir, '/videos');
      galleryMedia.push(...videos);
    }
    
    // Sort by title alphabetically
    galleryMedia.sort((a, b) => a.title.localeCompare(b.title));
    
    return NextResponse.json(galleryMedia);
  } catch (error) {
    console.error('Error fetching gallery media:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery media' }, { status: 500 });
  }
}
