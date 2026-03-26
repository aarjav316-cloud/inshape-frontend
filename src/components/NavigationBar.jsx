import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import HamburgerIcon from "./HamburgerIcon";
import SoundwaveIcon from "./SoundwaveIcon";

export default function NavigationBar() {
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);
  const soundwaveRef = useRef(null);

  useEffect(() => {
    // Fade in animation on load
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { translateY: 40, opacity: 0 },
        { translateY: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      );
    }
  }, []);

  const handleIconHover = (ref, isEntering) => {
    if (ref.current) {
      gsap.to(ref.current, {
        boxShadow: isEntering ? "0 0 12px #FFD600" : "0 0 0px #FFD600",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed bottom-[32px] left-1/2 transform -translate-x-1/2 z-50 w-full max-w-[600px] px-4 md:px-0"
    >
      <div
        className="bg-[#181818] rounded-[16px] h-[48px] md:h-[60px] flex items-center justify-between px-4 md:px-6"
        style={{
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* Hamburger Menu */}
        <button
          ref={hamburgerRef}
          className="p-2 rounded-lg transition-all"
          onMouseEnter={() => handleIconHover(hamburgerRef, true)}
          onMouseLeave={() => handleIconHover(hamburgerRef, false)}
          aria-label="Menu"
        >
          <HamburgerIcon />
        </button>

        {/* PHIVE Logo */}
        <div
          className="text-[#FFD600] font-bold text-[24px] md:text-[32px] tracking-[0.04em]"
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          PHIVE
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3">
          <button
            ref={soundwaveRef}
            className="p-2 rounded-lg transition-all"
            onMouseEnter={() => handleIconHover(soundwaveRef, true)}
            onMouseLeave={() => handleIconHover(soundwaveRef, false)}
            aria-label="Sound"
          >
            <SoundwaveIcon />
          </button>

          {/* Small weight plate */}
          <div className="w-[32px] h-[32px] md:w-[40px] md:h-[40px]">
            <svg
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient
                  id="smallPlateGradient"
                  cx="50%"
                  cy="50%"
                  r="50%"
                >
                  <stop offset="0%" stopColor="#2a2a2a" />
                  <stop offset="70%" stopColor="#1a1a1a" />
                  <stop offset="100%" stopColor="#0a0a0a" />
                </radialGradient>
              </defs>
              <circle
                cx="20"
                cy="20"
                r="19"
                fill="url(#smallPlateGradient)"
                stroke="#0a0a0a"
                strokeWidth="1"
              />
              <circle
                cx="20"
                cy="20"
                r="5"
                fill="#0a0a0a"
                stroke="#1a1a1a"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
}
