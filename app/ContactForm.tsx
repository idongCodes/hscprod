"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Handle different error types
        if (response.status === 429) {
          throw new Error('Please wait before submitting again. Rate limit: 1 submission per minute.');
        } else if (response.status === 400 && data.details) {
          // Show validation errors
          const validationErrors = data.details.map((err: { message: string }) => err.message).join(', ');
          throw new Error(validationErrors);
        } else {
          throw new Error(data.error || 'Failed to submit contact form');
        }
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white/5 border border-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Contact Me</h2>
        <p className="text-gray-400">Contact me for beats, collabs, etc!</p>
      </div>

      {status === "success" ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
          <p className="text-gray-400">I&apos;ll get back to you soon.</p>
          <button 
            onClick={() => setStatus("idle")}
            className="mt-6 text-purple-400 hover:text-purple-300 text-sm font-medium"
          >
            Send another message
          </button>
        </div>
      ) : status === "error" ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Error</h3>
          <p className="text-gray-400 mb-4">Failed to send message. Please try again.</p>
          <button 
            onClick={() => setStatus("idle")}
            className="mt-2 text-purple-400 hover:text-purple-300 text-sm font-medium"
          >
            Try again
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required 
              className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors" 
              placeholder="you@example.com" 
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
            <textarea 
              id="message" 
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5} 
              required 
              className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-colors resize-none" 
              placeholder="Tell me about your project..."
            ></textarea>
          </div>
          <button type="submit" disabled={status === "submitting"} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] disabled:opacity-50">
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}
