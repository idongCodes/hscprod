import ContactForm from "../ContactForm";

export default function Contact() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />
      
      {/* The Form */}
      <div className="relative z-10 w-full">
        <ContactForm />
      </div>
    </div>
  );
}
