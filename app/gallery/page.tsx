"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import FadeIn from "../FadeIn";

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
        
        <FadeIn>
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white inline-block border-b-4 border-purple-600 pb-2">
              Gallery
            </h1>
            <p className="text-gray-400 mt-4">
              A collection of visual works and production highlights.
            </p>
          </div>
        </FadeIn>

        {mediaItems.length === 0 ? (
          <p className="text-gray-500 italic">No media found in gallery yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaItems.map((item, index) => (
              <FadeIn key={item.id} delay={index * 0.1}>
                <div 
                  className="group relative aspect-video bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-lg hover:border-purple-500/50 transition-colors"
                >
                  {item.media_type === 'video' ? (
                    <video 
                      controls 
                      className="w-full h-full object-cover"
                      preload="metadata"
                      poster={item.thumbnail_url}
                    >
                      <source src={item.file_url} />
                      Your browser does not support video tag.
                    </video>
                  ) : (
                    <Image 
                      src={item.file_url} 
                      alt={item.title || 'Gallery item'} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                  
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {item.title && (
                      <p className="text-white text-sm font-medium truncate">
                        {item.title}
                      </p>
                    )}
                    {item.description && (
                      <p className="text-gray-300 text-xs mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
