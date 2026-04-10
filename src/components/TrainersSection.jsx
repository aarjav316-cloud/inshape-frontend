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
      className="relative w-full bg-[#0a0a0a] pt-20 sm:pt-24 md:pt-28 pb-24 lg:pb-32 shrink-0 flex flex-col items-center"
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
            className="group relative rounded-3xl overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20 w-full max-w-[340px] sm:max-w-md lg:max-w-[480px] shadow-lg h-[500px] sm:h-[550px] md:h-[600px] flex flex-col justify-end"
            style={{ opacity: 0 }}
          >
            {/* Background Image - Full Cover */}
            <img
              src="/src/assets/aman.jpeg"
              alt="Aman - Strength Coach"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

            {/* Badge */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-yellow-400 text-black px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg z-10">
              Lead Trainer
            </div>

            {/* Text Content Overlay */}
            <div className="relative z-10 p-6 sm:p-8 space-y-3 sm:space-y-4">
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-wide text-white">
                AMAN
              </h3>
              <p className="text-yellow-400 font-semibold text-lg sm:text-xl">
                Strength Coach
              </p>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Helping you build strength and discipline through proven
                training methods
              </p>
            </div>
          </div>

          {/* Trainer 2 - Vishal */}
          <div
            ref={card2Ref}
            className="group relative rounded-3xl overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20 w-full max-w-[340px] sm:max-w-md lg:max-w-[480px] shadow-lg h-[500px] sm:h-[550px] md:h-[600px] flex flex-col justify-end"
            style={{ opacity: 0 }}
          >
            {/* Background Image - Full Cover */}
            <img
              src="/src/assets/vishal.jpeg"
              alt="Vishal - Performance Coach"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

            {/* Badge */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-yellow-400 text-black px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg z-10">
              Performance Coach
            </div>

            {/* Text Content Overlay */}
            <div className="relative z-10 p-6 sm:p-8 space-y-3 sm:space-y-4">
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-wide text-white">
                VISHAL
              </h3>
              <p className="text-yellow-400 font-semibold text-lg sm:text-xl">
                Performance Coach
              </p>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Focused on performance and transformation with personalized
                training
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .trainer-card {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .trainer-card:hover {
          box-shadow: 0 0 100px 20px rgba(255, 214, 0, 0.35), 0 10px 40px rgba(0, 0, 0, 0.5);
          transform: translateY(-10px) scale(1.02);
          z-index: 10;
        }
      `}</style>

      {/* Spacer div with visible separation */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 md:h-40 lg:h-48 bg-gradient-to-b from-transparent to-black/20" />
    </section>
  );
}
