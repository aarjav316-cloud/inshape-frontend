import { useState } from "react";

export default function BottomNavbar({ onContactClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "#", action: "scroll" },
    { name: "Membership Plan", href: "#pricing", action: "scroll" },
    { name: "Contact", href: "#contact", action: "modal" },
    { name: "Trainers", href: "#trainers", action: "scroll" },
  ];

  const handleMenuClick = (item) => {
    if (item.action === "modal") {
      onContactClick?.();
    } else if (item.action === "scroll") {
      if (item.href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-[600px] px-4 md:px-0">
      {/* Expanded Menu */}
      {isMenuOpen && (
        <div
          className="mb-4 rounded-2xl overflow-hidden py-4"
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleMenuClick(item)}
              className="group relative block w-full px-6 md:px-8 py-3 text-white text-center font-medium transition-all duration-300 hover:bg-[#FFD600]/20 hover:text-[#FFD600] hover:scale-105 hover:shadow-lg hover:shadow-[#FFD600]/10"
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: "18px",
              }}
            >
              <span className="relative z-10">{item.name}</span>
              {/* Underline effect */}
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#FFD600] transition-all duration-300 group-hover:w-3/4 rounded-full"></span>
            </button>
          ))}
        </div>
      )}

      {/* Main Navbar */}
      <div
        className="flex items-center justify-between py-4 rounded-2xl"
        style={{
          background: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          paddingLeft: "32px",
          paddingRight: "32px",
        }}
      >
        {/* Left - Hamburger Menu */}
        <button
          className="p-2 ml-2 rounded-lg transition-all duration-300 hover:bg-[#FFD600]/20 hover:scale-110 active:scale-95"
          aria-label="Menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white hover:text-[#FFD600] transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(255,214,0,0.6)]"
          >
            {isMenuOpen ? (
              <>
                <rect
                  x="6"
                  y="6"
                  width="18"
                  height="2.5"
                  fill="currentColor"
                  rx="1"
                  transform="rotate(45 12 12)"
                />
                <rect
                  x="6"
                  y="6"
                  width="18"
                  height="2.5"
                  fill="currentColor"
                  rx="1"
                  transform="rotate(-45 12 12)"
                />
              </>
            ) : (
              <>
                <rect
                  x="3"
                  y="6"
                  width="18"
                  height="2.5"
                  fill="currentColor"
                  rx="1"
                />
                <rect
                  x="3"
                  y="11"
                  width="18"
                  height="2.5"
                  fill="currentColor"
                  rx="1"
                />
                <rect
                  x="3"
                  y="16"
                  width="18"
                  height="2.5"
                  fill="currentColor"
                  rx="1"
                />
              </>
            )}
          </svg>
        </button>

        {/* Center - Logo */}
        <div
          className="text-2xl md:text-3xl font-black text-[#FFD600] tracking-tight cursor-pointer transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(255,214,0,0.8)]"
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            textShadow: "0 0 20px rgba(255, 214, 0, 0.3)",
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          INSHAPE
        </div>

        {/* Right - Soundwave Icon */}
        <button
          className="p-2 rounded-lg transition-all duration-300 hover:bg-[#FFD600]/20 hover:scale-110 active:scale-95"
          aria-label="Sound"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white hover:text-[#FFD600] transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(255,214,0,0.6)]"
          >
            <rect x="2" y="8" width="2" height="8" fill="currentColor" rx="1" />
            <rect
              x="6"
              y="4"
              width="2"
              height="16"
              fill="currentColor"
              rx="1"
            />
            <rect
              x="10"
              y="6"
              width="2"
              height="12"
              fill="currentColor"
              rx="1"
            />
            <rect
              x="14"
              y="2"
              width="2"
              height="20"
              fill="currentColor"
              rx="1"
            />
            <rect
              x="18"
              y="7"
              width="2"
              height="10"
              fill="currentColor"
              rx="1"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
