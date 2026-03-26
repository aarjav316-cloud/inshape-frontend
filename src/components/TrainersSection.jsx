import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TrainersSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const underlineRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      );

      tl.fromTo(
        underlineRef.current,
        { width: 0 },
        { width: "100%", duration: 0.6, ease: "power2.out" },
        "-=0.3",
      );

      tl.fromTo(
        [card1Ref.current, card2Ref.current],
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        },
        "-=0.3",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="trainers"
      ref={sectionRef}
      className="relative w-full bg-[#0a0a0a] pt-20 sm:pt-24 md:pt-28 pb-40 sm:pb-48 md:pb-56 lg:pb-64 xl:pb-72 flex flex-col items-center"
    >
      <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12">
        {/* Heading */}
        <div className="text-center" style={{ marginBottom: "48px" }}>
          <h2
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white px-4"
            style={{
              fontFamily: "Impact, 'Arial Black', sans-serif",
              letterSpacing: "0.05em",
              opacity: 0,
              marginBottom: "24px",
            }}
          >
            OUR TRAINERS
          </h2>
          <div className="flex justify-center">
            <div
              ref={underlineRef}
              className="h-1 bg-[#FFD600] rounded-full"
              style={{ width: 0, maxWidth: "140px" }}
            />
          </div>
        </div>

        {/* Trainer Cards */}
        <div
          className="flex flex-col lg:flex-row items-center justify-center gap-12 sm:gap-14 lg:gap-16 max-w-6xl mx-auto"
          style={{ marginTop: "48px" }}
        >
          {/* Trainer 1 - Aman */}
          <div
            ref={card1Ref}
            className="trainer-card group relative bg-[#1a1a1a] rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] w-full max-w-[340px] sm:max-w-md lg:max-w-[480px]"
            style={{
              opacity: 0,
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div className="relative h-[280px] sm:h-[320px] md:h-[360px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800"
                alt="Aman - Strength Coach"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#1a1a1a] via-[#1a1a1a]/30 to-transparent" />
            </div>

            <div
              className="space-y-5 sm:space-y-6"
              style={{
                padding: "40px 32px",
              }}
            >
              <h3
                className="text-3xl sm:text-4xl font-black text-white leading-tight"
                style={{
                  fontFamily: "Impact, 'Arial Black', sans-serif",
                  letterSpacing: "0.05em",
                }}
              >
                AMAN
              </h3>
              <p className="text-[#FFD600] text-lg sm:text-xl font-bold">
                Strength Coach
              </p>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed pt-1">
                Helping you build strength and discipline through proven
                training methods
              </p>
            </div>

            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FFD600] rounded-2xl transition-all duration-500 pointer-events-none" />
          </div>

          {/* Trainer 2 - Vishal */}
          <div
            ref={card2Ref}
            className="trainer-card group relative bg-[#1a1a1a] rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] w-full max-w-[340px] sm:max-w-md lg:max-w-[480px]"
            style={{
              opacity: 0,
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div className="relative h-[280px] sm:h-[320px] md:h-[360px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800"
                alt="Vishal - Performance Coach"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#1a1a1a] via-[#1a1a1a]/30 to-transparent" />
            </div>

            <div
              className="space-y-5 sm:space-y-6"
              style={{
                padding: "40px 32px",
              }}
            >
              <h3
                className="text-3xl sm:text-4xl font-black text-white leading-tight"
                style={{
                  fontFamily: "Impact, 'Arial Black', sans-serif",
                  letterSpacing: "0.05em",
                }}
              >
                VISHAL
              </h3>
              <p className="text-[#FFD600] text-lg sm:text-xl font-bold">
                Performance Coach
              </p>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed pt-1">
                Focused on performance and transformation with personalized
                training
              </p>
            </div>

            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FFD600] rounded-2xl transition-all duration-500 pointer-events-none" />
          </div>
        </div>
      </div>

      <style>{`
        .trainer-card:hover {
          box-shadow: 0 20px 60px rgba(255, 214, 0, 0.15), 0 10px 40px rgba(0, 0, 0, 0.5);
        }
      `}</style>

      {/* Spacer div with visible separation */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 md:h-40 lg:h-48 bg-gradient-to-b from-transparent to-black/20" />
    </section>
  );
}
