export default function Footer({ onContactClick }) {
  return (
    <footer className="relative w-full bg-[#050505] border-t border-[#FFD600]/20 flex justify-center mt-12 sm:mt-16">
      {/* Subtle Yellow Glow */}
      <div className="absolute inset-0 bg-linear-to-br from-[#FFD600]/10 via-transparent to-transparent blur-2xl opacity-30"></div>

      {/* Main Container */}
      <div className="relative w-full max-w-[1400px] px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-44 sm:pb-40 md:pb-40">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16 lg:gap-20 xl:gap-24 mb-16">
          {/* Brand */}
          <div className="text-center">
            <h3
              className="text-3xl sm:text-4xl font-black text-[#FFD600] mb-4 tracking-wide"
              style={{
                fontFamily: "Impact, 'Arial Black', sans-serif",
              }}
            >
              INSHAPE
            </h3>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xs mx-auto">
              Built for strength. Designed for results.
            </p>
          </div>

          {/* Links */}
          <div className="text-center">
            <h4 className="text-white font-bold text-lg mb-5">Quick Links</h4>

            <nav className="flex flex-col space-y-3 items-center">
              {["Home", "Trainers", "Contact"].map((item, i) => (
                <a
                  key={i}
                  href={item === "Trainers" ? "#trainers" : "#"}
                  onClick={(e) => {
                    if (item === "Contact") {
                      e.preventDefault();
                      onContactClick?.();
                    }
                  }}
                  className="group relative text-gray-400 text-sm sm:text-base transition-all duration-300 hover:text-[#FFD600] cursor-pointer"
                >
                  {item}

                  {/* Underline Glow */}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#FFD600] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="text-center">
            <h4 className="text-white font-bold text-lg mb-5">Get In Touch</h4>

            <div className="space-y-3">
              <a
                href="tel:7566884737"
                className="block text-gray-400 text-sm sm:text-base hover:text-[#FFD600] transition-colors"
              >
                +91 7566884737
              </a>
              <a
                href="tel:8770906187"
                className="block text-gray-400 text-sm sm:text-base hover:text-[#FFD600] transition-colors"
              >
                +91 8770906187
              </a>

              {/* Social Icons */}
              <div className="flex justify-center gap-4 pt-3">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/inshapefitnessss?igsh=cDY3YTM5c3p5Zmx5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-11 h-11 rounded-full bg-[#111] border border-gray-700 
                  flex items-center justify-center 
                  hover:bg-[#FFD600] hover:scale-110 transition-all duration-300 shadow-lg"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-gray-800">
          <p className="text-center text-gray-500 text-sm">
            © 2026 INSHAPE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
