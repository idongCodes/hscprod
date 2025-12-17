import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black border-t border-white/10 py-8 text-center md:text-left">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Left Side: Copyright */}
        <div className="text-gray-500 text-sm">
          &copy; {currentYear} HSC Prod. All rights reserved.
        </div>

        {/* Right Side: Developer Credit */}
        <div className="text-gray-500 text-sm">
          Website by{" "}
          <Link 
            href="https://instagram.com/idongcodes" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-purple-400 transition-colors font-medium"
          >
            idongCodes
          </Link>
        </div>

      </div>
    </footer>
  );
}
