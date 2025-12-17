import fs from "fs";
import path from "path";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function Gallery() {
  const imageDirectory = path.join(process.cwd(), "public", "images");

  let files: string[] = [];
  try {
    files = fs.readdirSync(imageDirectory);
  } catch (error) {
    console.error("Error reading gallery folder:", error);
  }

  // UPDATED: Added 'heic' and 'mov' to the allowed list
  const mediaFiles = files.filter((file) => 
    /\.(jpg|jpeg|png|gif|webp|mp4|webm|mov|heic)$/i.test(file)
  );

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

        {mediaFiles.length === 0 ? (
          <p className="text-gray-500 italic">No media found in public/images yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaFiles.map((file) => {
              // Check file types
              const isVideo = /\.(mp4|webm|mov)$/i.test(file);
              const isHeic = /\.(heic)$/i.test(file);
              const src = `/images/${file}`;

              return (
                <div 
                  key={file} 
                  className="group relative aspect-video bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-lg hover:border-purple-500/50 transition-colors"
                >
                  {/* VIDEO LOGIC */}
                  {isVideo ? (
                    <video 
                      controls 
                      className="w-full h-full object-cover"
                      preload="metadata"
                    >
                      <source src={src} />
                      Your browser does not support the video tag.
                    </video>
                  ) : isHeic ? (
                    /* HEIC LOGIC: We use a standard <img> tag because Next.js optimization can struggle with HEIC */
                    <img 
                      src={src} 
                      alt={file} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    /* STANDARD IMAGE LOGIC (JPG, PNG, etc) */
                    <Image 
                      src={src} 
                      alt={file} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                  
                  {/* Filename Overlay */}
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <p className="text-white text-sm font-medium truncate">
                      {file.replace(/\.[^/.]+$/, "")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
