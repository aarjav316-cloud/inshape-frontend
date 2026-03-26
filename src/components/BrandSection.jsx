import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BrandSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const overlayTextRef = useRef(null);
  const photo1Ref = useRef(null);
  const photo2Ref = useRef(null);
  const photo3Ref = useRef(null);
  const photo4Ref = useRef(null);
  const photo5Ref = useRef(null);
  const photo6Ref = useRef(null);
  const button2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Responsive photo spread distances based on screen size
      const getPhotoPositions = () => {
        const width = window.innerWidth;

        if (width < 640) {
          // Mobile - minimal spread
          return [
            { ref: photo1Ref, x: -80, y: -40, rotation: -12 },
            { ref: photo2Ref, x: -40, y: 50, rotation: -6 },
            { ref: photo3Ref, x: 0, y: -30, rotation: 2 },
            { ref: photo4Ref, x: 40, y: 50, rotation: 8 },
            { ref: photo5Ref, x: 80, y: -35, rotation: 12 },
            { ref: photo6Ref, x: -60, y: 20, rotation: -8 },
          ];
        } else if (width < 1024) {
          // Tablet - medium spread
          return [
            { ref: photo1Ref, x: -150, y: -80, rotation: -15 },
            { ref: photo2Ref, x: -80, y: 100, rotation: -7 },
            { ref: photo3Ref, x: 0, y: -60, rotation: 3 },
            { ref: photo4Ref, x: 80, y: 100, rotation: 9 },
            { ref: photo5Ref, x: 150, y: -70, rotation: 13 },
            { ref: photo6Ref, x: -120, y: 40, rotation: -10 },
          ];
        } else {
          // Desktop - full spread
          return [
            { ref: photo1Ref, x: -250, y: -120, rotation: -18 },
            { ref: photo2Ref, x: -120, y: 150, rotation: -8 },
            { ref: photo3Ref, x: 0, y: -80, rotation: 3 },
            { ref: photo4Ref, x: 120, y: 140, rotation: 10 },
            { ref: photo5Ref, x: 240, y: -100, rotation: 15 },
            { ref: photo6Ref, x: -180, y: 50, rotation: -12 },
          ];
        }
      };

      const photos = getPhotoPositions();

      // Photo spread animation with scroll
      photos.forEach((photo) => {
        if (photo.ref.current) {
          gsap.fromTo(
            photo.ref.current,
            {
              x: 0,
              y: 0,
              rotation: 0,
            },
            {
              x: photo.x,
              y: photo.y,
              rotation: photo.rotation,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top center",
                end: "center center",
                scrub: 1.5,
              },
            },
          );
        }
      });

      // Create timeline for sequential text animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play none none none",
        },
      });

      // INSHAPE appears first
      tl.fromTo(
        line1Ref.current,
        { y: 80, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          ease: "back.out(1.5)",
        },
      );

      // FITNESS appears second
      tl.fromTo(
        line2Ref.current,
        { y: 80, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          ease: "back.out(1.5)",
        },
        "-=0.4",
      );

      // "CHOOSE YOUR CLUB" appears third
      tl.fromTo(
        overlayTextRef.current,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
        },
        "-=0.3",
      );

      // Button appears last
      tl.fromTo(
        button2Ref.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.2",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="brand-section relative w-full min-h-screen bg-[#0a0a0a] flex items-center justify-center py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6">
        {/* Stacked Photos - Center */}
        <div
          className="relative flex items-center justify-center mb-16 sm:mb-20 md:mb-24"
          style={{ height: "500px", minHeight: "400px" }}
        >
          {/* Photo 6 - Back layer */}
          <div
            ref={photo6Ref}
            className="absolute w-[200px] h-[250px] sm:w-[280px] sm:h-[350px] md:w-[340px] md:h-[430px] lg:w-[380px] lg:h-[480px] rounded-lg overflow-hidden shadow-2xl"
            style={{
              zIndex: 1,
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800"
              alt="Gym equipment"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Photo 5 */}
          <div
            ref={photo5Ref}
            className="absolute w-[210px] h-[260px] sm:w-[290px] sm:h-[360px] md:w-[350px] md:h-[440px] lg:w-[390px] lg:h-[490px] rounded-lg overflow-hidden shadow-2xl"
            style={{
              zIndex: 2,
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800"
              alt="Fitness training"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Photo 4 */}
          <div
            ref={photo4Ref}
            className="absolute w-[220px] h-[270px] sm:w-[300px] sm:h-[370px] md:w-[360px] md:h-[450px] lg:w-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-2xl"
            style={{
              zIndex: 3,
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800"
              alt="Gym"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Photo 3 */}
          <div
            ref={photo3Ref}
            className="absolute w-[230px] h-[280px] sm:w-[310px] sm:h-[380px] md:w-[370px] md:h-[460px] lg:w-[410px] lg:h-[510px] rounded-lg overflow-hidden shadow-2xl"
            style={{
              zIndex: 4,
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800"
              alt="Training"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Photo 2 */}
          <div
            ref={photo2Ref}
            className="absolute w-[240px] h-[290px] sm:w-[320px] sm:h-[390px] md:w-[380px] md:h-[470px] lg:w-[420px] lg:h-[520px] rounded-lg overflow-hidden shadow-2xl"
            style={{
              zIndex: 5,
              boxShadow: "0 25px 70px rgba(0, 0, 0, 0.55)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=900"
              alt="Fitness"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Photo 1 - Front (main) */}
          <div
            ref={photo1Ref}
            className="absolute w-[250px] h-[300px] sm:w-[340px] sm:h-[410px] md:w-[400px] md:h-[490px] lg:w-[450px] lg:h-[550px] rounded-lg overflow-hidden shadow-2xl"
            style={{
              zIndex: 6,
              boxShadow: "0 30px 80px rgba(0, 0, 0, 0.6)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=900"
              alt="Workout"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Large "INSHAPE FITNESS" Text Overlay */}
        <div
          ref={headingRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center w-full px-4"
          style={{ zIndex: 10 }}
        >
          <h2
            ref={line1Ref}
            className="text-[60px] sm:text-[90px] md:text-[140px] lg:text-[180px] xl:text-[240px] font-black leading-tight"
            style={{
              fontFamily: "Impact, 'Arial Black', sans-serif",
              color: "#FFD600",
              letterSpacing: "-0.02em",
              textShadow: "4px 4px 0px rgba(0, 0, 0, 0.3)",
              lineHeight: "0.85",
              opacity: 0,
            }}
          >
            INSHAPE
          </h2>
          <h2
            ref={line2Ref}
            className="text-[60px] sm:text-[90px] md:text-[140px] lg:text-[180px] xl:text-[240px] font-black leading-tight"
            style={{
              fontFamily: "Impact, 'Arial Black', sans-serif",
              color: "#FFD600",
              letterSpacing: "-0.02em",
              textShadow: "4px 4px 0px rgba(0, 0, 0, 0.3)",
              lineHeight: "0.85",
              opacity: 0,
            }}
          >
            FITNESS
          </h2>
        </div>

        {/* Overlay Script Text */}
        <div
          ref={overlayTextRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 pointer-events-none px-4"
          style={{
            zIndex: 11,
            marginTop: "-20px",
            opacity: 0,
          }}
        >
          <h3
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white whitespace-nowrap"
            style={{
              fontFamily: "'Brush Script MT', cursive, sans-serif",
              fontStyle: "italic",
              textShadow: "3px 3px 8px rgba(0, 0, 0, 0.7)",
            }}
          >
            CHOOSE YOUR CLUB
          </h3>
        </div>

        {/* Button - Positioned below images */}
        <div className="relative flex justify-center" style={{ zIndex: 12 }}>
          <button
            ref={button2Ref}
            className="bg-transparent border-[#FFD600] text-[#FFD600] font-bold rounded-full text-sm sm:text-base md:text-lg lg:text-xl uppercase transition-all duration-300 hover:bg-[#FFD600] hover:text-black active:bg-[#FFD600] active:text-black hover:scale-105 active:scale-105 hover:shadow-xl pointer-events-auto"
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              borderWidth: "3px",
              paddingLeft: "24px",
              paddingRight: "24px",
              paddingTop: "12px",
              paddingBottom: "12px",
              letterSpacing: "0.15em",
              opacity: 0,
              WebkitTapHighlightColor: "transparent",
            }}
          >
            SCHEDULE A VISIT
          </button>
        </div>

        {/* Decorative Lines */}
        <div
          className="absolute bottom-20 sm:bottom-24 md:bottom-32 right-8 sm:right-12 md:right-20 w-12 sm:w-16 md:w-20 h-1 bg-[#FFD600]"
          style={{ zIndex: 5 }}
        />
      </div>

      {/* Responsive button styles */}
      <style>{`
        .brand-section button:active {
          background-color: #FFD600 !important;
          color: #000000 !important;
          transform: scale(1.05);
        }
        
        @media (max-width: 639px) {
          .brand-section > div > div:first-child {
            height: 450px !important;
            margin-bottom: 3rem !important;
          }
        }
        @media (min-width: 640px) {
          .brand-section button {
            border-width: 3px;
            padding-left: 32px;
            padding-right: 32px;
            padding-top: 14px;
            padding-bottom: 14px;
          }
        }
        @media (min-width: 768px) {
          .brand-section button {
            border-width: 4px;
            padding-left: 40px;
            padding-right: 40px;
            padding-top: 16px;
            padding-bottom: 16px;
          }
        }
        @media (min-width: 1024px) {
          .brand-section button {
            padding-left: 48px;
            padding-right: 48px;
            padding-top: 20px;
            padding-bottom: 20px;
          }
        }
      `}</style>
    </section>
  );
}
