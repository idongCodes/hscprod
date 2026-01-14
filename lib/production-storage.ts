// Simple production storage for testimonials when Supabase is not available
// This uses a global variable to persist across API calls in production

interface Testimonial {
  id: string;
  name: string;
  title: string;
  message: string;
  is_approved: boolean;
  source: string;
  created_at: string;
  updated_at: string;
}

// Global storage for production
declare global {
  var productionTestimonials: Testimonial[] | undefined;
}

// Initialize production testimonials with default data
export function getProductionTestimonials(): Testimonial[] {
  console.log('getProductionTestimonials called, current storage:', global.productionTestimonials);
  
  if (!global.productionTestimonials) {
    console.log('Initializing production testimonials with default data');
    global.productionTestimonials = [
      {
        id: "1",
        name: "Yung Fader",
        title: "Producer",
        message: "The drum kits are absolutely lethal. Cleanest 808s I've ever used in a production. HSC really knows how to mix the low end.",
        is_approved: true,
        source: 'manual',
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z"
      },
      {
        id: "2",
        name: "Melody Queen",
        title: "R&B Artist",
        message: "HSC created a custom beat that fit my voice perfectly. The vibe in the studio is unmatched—he gets the best performance out of you.",
        is_approved: true,
        source: 'manual',
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z"
      },
      {
        id: "3",
        name: "Da Architect",
        title: "Sound Engineer",
        message: "Mixing these stems was a breeze. High quality recording and professional organization makes my life so much easier.",
        is_approved: true,
        source: 'manual',
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z"
      }
    ];
  }
  console.log('Returning testimonials:', global.productionTestimonials.length, 'total');
  return global.productionTestimonials;
}

export function addProductionTestimonial(testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>): Testimonial {
  const testimonials = getProductionTestimonials();
  const newTestimonial: Testimonial = {
    ...testimonial,
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  // Add to beginning of array (newest first)
  testimonials.unshift(newTestimonial);
  
  console.log('Added testimonial to production storage:', newTestimonial);
  return newTestimonial;
}

export function updateProductionTestimonial(id: string, updates: Partial<Testimonial>): Testimonial | null {
  const testimonials = getProductionTestimonials();
  const index = testimonials.findIndex(t => t.id === id);
  
  if (index === -1) return null;
  
  testimonials[index] = {
    ...testimonials[index],
    ...updates,
    updated_at: new Date().toISOString()
  };
  
  console.log('Updated testimonial in production storage:', testimonials[index]);
  return testimonials[index];
}

export function deleteProductionTestimonial(id: string): Testimonial | null {
  const testimonials = getProductionTestimonials();
  const index = testimonials.findIndex(t => t.id === id);
  
  if (index === -1) return null;
  
  const deleted = testimonials.splice(index, 1)[0];
  console.log('Deleted testimonial from production storage:', deleted);
  return deleted;
}

export function getPendingProductionTestimonials(): Testimonial[] {
  const testimonials = getProductionTestimonials();
  return testimonials.filter(t => t.is_approved === false);
}

export function getApprovedProductionTestimonials(): Testimonial[] {
  const testimonials = getProductionTestimonials();
  return testimonials.filter(t => t.is_approved === true);
}
