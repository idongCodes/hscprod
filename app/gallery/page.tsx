"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface GalleryMedia {
  id: string;
  title: string;
  media_type: 'video' | 'image';
  file_url: string;
  thumbnail_url?: string;
  description?: string;
}

export default function Gallery() {
  const [mediaItems, setMediaItems] = useState<GalleryMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<GalleryMedia | null>(null);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const response = await fetch('/api/gallery');
        if (!response.ok) throw new Error('Failed to fetch gallery media');
        const galleryMedia = await response.json();
        setMediaItems(galleryMedia);
      } catch (error) {
        console.error('Error loading gallery media:', error);
        setMediaItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadMedia();
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedMedia) {
        setSelectedMedia(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedMedia]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="text-white text-xl">Loading gallery...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4">
      <div className="max-w-screen-xl mx-auto">
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white inline-block border-b-4 border-purple-600 pb-2">
            Gallery
          </h1>
          <p className="text-gray-400 mt-4">
            A collection of visual works and production highlights.
          </p>
        </div>

        {mediaItems.length === 0 ? (
          <p className="text-gray-500 italic">No media found in gallery yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {mediaItems.map((item) => (
              <div key={item.id} className="group relative aspect-video overflow-hidden cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setSelectedMedia(item)}>
                {item.media_type === 'video' ? (
                  <video 
                    controls={false}
                    className="w-full h-full object-cover"
                    preload="metadata"
                    poster={item.thumbnail_url}
                    muted
                  >
                    <source src={item.file_url} />
                    Your browser does not support video tag.
                  </video>
                ) : (
                  <Image 
                    src={item.file_url} 
                    alt="Gallery media" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Modal for full resolution viewing */}
        {selectedMedia && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <div 
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-white/80 hover:text-white text-4xl font-light z-10"
                onClick={() => setSelectedMedia(null)}
              >
                ×
              </button>
              
              {selectedMedia.media_type === 'video' ? (
                <video 
                  controls
                  className="max-w-full max-h-full object-contain"
                  preload="metadata"
                  autoPlay
                >
                  <source src={selectedMedia.file_url} />
                  Your browser does not support video tag.
                </video>
              ) : (
                <Image 
                  src={selectedMedia.file_url} 
                  alt="Gallery media full resolution" 
                  width={1920}
                  height={1080}
                  className="max-w-full max-h-full object-contain"
                  priority
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
