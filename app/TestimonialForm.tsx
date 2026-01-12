"use client";

import { useState } from "react";
import FadeIn from "./FadeIn";

export default function TestimonialForm() {
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/testimonials/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          title: formData.profession,
          message: formData.message
        })
      });

      if (!response.ok) throw new Error('Failed to submit testimonial');
      
      const newTestimonial = await response.json();
      
      // Trigger a custom event to notify Testimonials component
      window.dispatchEvent(new CustomEvent('newTestimonial', { detail: newTestimonial }));
      
      setIsSubmitted(true);
      setFormData({ name: "", profession: "", message: "" });
      
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      alert('Error submitting testimonial. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-24 px-4 border-t border-white/10">
      <div className="max-w-2xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Share Your <span className="text-purple-500">Experience</span>
            </h2>
            <p className="text-gray-400">
              Worked with HSC Prod? Let others know about your experience.
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-12 bg-green-500/10 border border-green-500/30 rounded-2xl">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
              <p className="text-gray-300">Your testimonial has been added.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 border border-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="profession" className="block text-sm font-medium text-gray-300 mb-2">Profession</label>
                <input
                  type="text"
                  id="profession"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors"
                  placeholder="e.g., Producer, Artist, Engineer"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Your Experience</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors resize-none"
                  placeholder="Tell us about your experience working with HSC Prod..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Testimonial"}
              </button>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
