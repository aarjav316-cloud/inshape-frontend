import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FloatingPlate({
  position = "top-left",
  size = "large",
}) {
  const plateRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (wrapperRef.current) {
      const isLeft = position === "top-left";
      const triggerId = `plate-${position}`;

      // Only kill triggers for this specific plate
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id === triggerId) {
          trigger.kill();
        }
      });

      // Set initial transform with slight angle to show thickness
      gsap.set(wrapperRef.current, {
        y: 0,
        rotateX: isLeft ? -15 : 15,
        rotateY: isLeft ? -25 : 25,
        rotateZ: 0,
        scale: 1,
        opacity: 1,
      });

      // Scroll-based animation with strong 3D rotation - showing side view
      gsap.fromTo(
        wrapperRef.current,
        {
          y: 0,
          rotateX: isLeft ? -15 : 15,
          rotateY: isLeft ? -25 : 25,
          rotateZ: 0,
          scale: 1,
          opacity: 1,
          force3D: true,
        },
        {
          y: isLeft ? 250 : -250,
          rotateX: isLeft ? 60 : -60,
          rotateY: isLeft ? 270 : -270,
          rotateZ: isLeft ? 45 : -45,
          scale: 1.3,
          opacity: 0,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            id: triggerId,
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
            markers: false,
          },
        },
      );
    }

    return () => {
      const triggerId = `plate-${position}`;
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id === triggerId) {
          trigger.kill();
        }
      });
    };
  }, [position]);

  const positionClasses = {
    "top-left": "top-[-50px] left-[-50px] md:top-[40px] md:left-[60px]",
    "bottom-right":
      "bottom-[-30px] right-[-40px] md:bottom-[60px] md:right-[80px]",
  };

  const sizeClasses = {
    large: "w-[200px] h-[200px] md:w-[280px] md:h-[280px]",
    small: "w-[150px] h-[150px] md:w-[220px] md:h-[220px]",
  };

  return (
    <div
      ref={plateRef}
      className={`absolute ${positionClasses[position]} ${sizeClasses[size]} pointer-events-none z-10`}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          perspective: "2000px",
          perspectiveOrigin: "center center",
        }}
      >
        <div
          ref={wrapperRef}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            filter: "drop-shadow(0 30px 60px rgba(0, 0, 0, 0.7))",
            transformStyle: "preserve-3d",
            willChange: "transform",
            backfaceVisibility: "visible",
          }}
        >
          {/* Front face */}
          <svg
            viewBox="0 0 300 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "relative",
              zIndex: 2,
              transformStyle: "preserve-3d",
            }}
          >
            <defs>
              {/* Smooth beveled outer rim gradient - top-left lighting */}
              <radialGradient id={`outerBevel-${position}`} cx="35%" cy="35%">
                <stop offset="0%" stopColor="#5a5a5a" />
                <stop offset="50%" stopColor="#3a3a3a" />
                <stop offset="100%" stopColor="#252525" />
              </radialGradient>

              {/* Main plate surface - smooth matte finish */}
              <radialGradient id={`mainSurface-${position}`} cx="38%" cy="38%">
                <stop offset="0%" stopColor="#4a4a4a" />
                <stop offset="60%" stopColor="#333333" />
                <stop offset="100%" stopColor="#282828" />
              </radialGradient>

              {/* Inner ring with subtle depth */}
              <radialGradient id={`innerRing-${position}`} cx="40%" cy="40%">
                <stop offset="0%" stopColor="#3d3d3d" />
                <stop offset="70%" stopColor="#2d2d2d" />
                <stop offset="100%" stopColor="#222222" />
              </radialGradient>

              {/* Mask for transparent center hole */}
              <mask id={`holeMask-${position}`}>
                <rect width="300" height="300" fill="white" />
                <ellipse cx="150" cy="150" rx="35" ry="35" fill="black" />
              </mask>
            </defs>

            {/* All plate elements with mask applied */}
            <g mask={`url(#holeMask-${position})`}>
              {/* Outer beveled edge */}
              <ellipse
                cx="150"
                cy="150"
                rx="148"
                ry="148"
                fill={`url(#outerBevel-${position})`}
              />

              {/* Main plate surface */}
              <ellipse
                cx="150"
                cy="150"
                rx="138"
                ry="138"
                fill={`url(#mainSurface-${position})`}
              />

              {/* Subtle outer ring for depth */}
              <ellipse
                cx="150"
                cy="150"
                rx="115"
                ry="115"
                fill="none"
                stroke="#1f1f1f"
                strokeWidth="1"
                opacity="0.3"
              />

              {/* Inner ring surface */}
              <ellipse
                cx="150"
                cy="150"
                rx="100"
                ry="100"
                fill={`url(#innerRing-${position})`}
              />

              {/* Subtle inner ring for depth */}
              <ellipse
                cx="150"
                cy="150"
                rx="80"
                ry="80"
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="1"
                opacity="0.25"
              />
            </g>

            {/* Center hole with smooth inner shadow */}
            <ellipse
              cx="150"
              cy="150"
              rx="35"
              ry="35"
              fill="none"
              stroke="#0a0a0a"
              strokeWidth="3"
              opacity="0.5"
            />

            {/* Hole inner edge highlight */}
            <ellipse
              cx="150"
              cy="150"
              rx="33"
              ry="33"
              fill="none"
              stroke="#2a2a2a"
              strokeWidth="1"
              opacity="0.3"
            />

            {/* Text paths for curved text */}
            <defs>
              {/* Top curve for PHIVE */}
              <path
                id={`topCurve-${position}`}
                d="M 50,150 A 100,100 0 0,1 250,150"
              />
              {/* Bottom curve for PHIVE (upside down) */}
              <path
                id={`bottomCurve-${position}`}
                d="M 250,150 A 100,100 0 0,1 50,150"
              />
            </defs>

            {/* PHIVE text on top curve */}
            <text
              fill="#FFFFFF"
              fontSize="42"
              fontWeight="900"
              letterSpacing="4"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              <textPath
                href={`#topCurve-${position}`}
                startOffset="50%"
                textAnchor="middle"
              >
                PHIVE
              </textPath>
            </text>

            {/* PHIVE text on bottom curve */}
            <text
              fill="#FFFFFF"
              fontSize="42"
              fontWeight="900"
              letterSpacing="4"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              <textPath
                href={`#bottomCurve-${position}`}
                startOffset="50%"
                textAnchor="middle"
              >
                PHIVE
              </textPath>
            </text>

            {/* 25 KG text on left side */}
            <text
              x="80"
              y="145"
              fill="#FFFFFF"
              fontSize="15"
              fontWeight="700"
              textAnchor="middle"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              25
            </text>
            <text
              x="80"
              y="160"
              fill="#FFFFFF"
              fontSize="11"
              fontWeight="700"
              textAnchor="middle"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              KG
            </text>

            {/* 25 KG text on right side */}
            <text
              x="220"
              y="145"
              fill="#FFFFFF"
              fontSize="15"
              fontWeight="700"
              textAnchor="middle"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              25
            </text>
            <text
              x="220"
              y="160"
              fill="#FFFFFF"
              fontSize="11"
              fontWeight="700"
              textAnchor="middle"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              KG
            </text>
          </svg>

          {/* 3D Depth layers - creating EXTREMELY THICK with ROUNDED circular edge */}
          {[...Array(200)].map((_, i) => {
            // Create very pronounced rounded profile - more circular
            const progress = i / 200;
            // Use elliptical curve for rounder edges
            const bevelCurve = Math.pow(Math.sin(progress * Math.PI), 0.5);
            // More dramatic radius change for rounder appearance
            const radiusOuter = 148 - bevelCurve * 18;
            const radiusInner = 35 + bevelCurve * 12;
            const brightness = Math.max(12, 35 - i * 0.08 + bevelCurve * 12);

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  transform: `translateZ(-${i * 5}px)`,
                  transformStyle: "preserve-3d",
                  pointerEvents: "none",
                }}
              >
                <svg
                  viewBox="0 0 300 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    opacity: Math.max(0.35, 0.99 - i * 0.004),
                  }}
                >
                  <defs>
                    <mask id={`holeMask-depth-${position}-${i}`}>
                      <rect width="300" height="300" fill="white" />
                      <ellipse
                        cx="150"
                        cy="150"
                        rx={radiusInner}
                        ry={radiusInner}
                        fill="black"
                      />
                    </mask>
                    <radialGradient id={`edgeGrad-${position}-${i}`}>
                      <stop
                        offset="0%"
                        stopColor={`hsl(0, 0%, ${brightness}%)`}
                      />
                      <stop
                        offset="30%"
                        stopColor={`hsl(0, 0%, ${Math.max(10, brightness - 5)}%)`}
                      />
                      <stop
                        offset="60%"
                        stopColor={`hsl(0, 0%, ${Math.max(8, brightness - 10)}%)`}
                      />
                      <stop
                        offset="85%"
                        stopColor={`hsl(0, 0%, ${Math.max(6, brightness - 16)}%)`}
                      />
                      <stop
                        offset="100%"
                        stopColor={`hsl(0, 0%, ${Math.max(5, brightness - 20)}%)`}
                      />
                    </radialGradient>
                  </defs>
                  <g mask={`url(#holeMask-depth-${position}-${i})`}>
                    {/* Main body fill with smooth gradient */}
                    <ellipse
                      cx="150"
                      cy="150"
                      rx={radiusOuter}
                      ry={radiusOuter}
                      fill={`url(#edgeGrad-${position}-${i})`}
                    />
                    {/* Multiple rings for smooth rounded edge */}
                    <ellipse
                      cx="150"
                      cy="150"
                      rx={radiusOuter}
                      ry={radiusOuter}
                      fill="none"
                      stroke={`hsl(0, 0%, ${Math.max(14, brightness + 4)}%)`}
                      strokeWidth="20"
                    />
                    <ellipse
                      cx="150"
                      cy="150"
                      rx={radiusOuter - 14}
                      ry={radiusOuter - 14}
                      fill="none"
                      stroke={`hsl(0, 0%, ${Math.max(12, brightness + 1)}%)`}
                      strokeWidth="12"
                    />
                    <ellipse
                      cx="150"
                      cy="150"
                      rx={radiusOuter - 24}
                      ry={radiusOuter - 24}
                      fill="none"
                      stroke={`hsl(0, 0%, ${Math.max(10, brightness - 3)}%)`}
                      strokeWidth="8"
                    />
                  </g>
                  {/* Very thick inner hole edge with smooth rounded bevel */}
                  <ellipse
                    cx="150"
                    cy="150"
                    rx={radiusInner}
                    ry={radiusInner}
                    fill="none"
                    stroke={`hsl(0, 0%, ${Math.max(6, brightness - 14)}%)`}
                    strokeWidth="20"
                  />
                  <ellipse
                    cx="150"
                    cy="150"
                    rx={radiusInner + 10}
                    ry={radiusInner + 10}
                    fill="none"
                    stroke={`hsl(0, 0%, ${Math.max(8, brightness - 12)}%)`}
                    strokeWidth="12"
                  />
                  <ellipse
                    cx="150"
                    cy="150"
                    rx={radiusInner + 19}
                    ry={radiusInner + 19}
                    fill="none"
                    stroke={`hsl(0, 0%, ${Math.max(10, brightness - 10)}%)`}
                    strokeWidth="8"
                  />
                </svg>
              </div>
            );
          })}

          {/* Back face */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              transform: "translateZ(-1000px)",
              transformStyle: "preserve-3d",
            }}
          >
            <svg
              viewBox="0 0 300 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient
                  id={`backSurface-${position}`}
                  cx="62%"
                  cy="62%"
                >
                  <stop offset="0%" stopColor="#2a2a2a" />
                  <stop offset="60%" stopColor="#1d1d1d" />
                  <stop offset="100%" stopColor="#151515" />
                </radialGradient>
                <mask id={`holeMaskBack-${position}`}>
                  <rect width="300" height="300" fill="white" />
                  <ellipse cx="150" cy="150" rx="35" ry="35" fill="black" />
                </mask>
              </defs>
              <g mask={`url(#holeMaskBack-${position})`}>
                <ellipse
                  cx="150"
                  cy="150"
                  rx="148"
                  ry="148"
                  fill={`url(#backSurface-${position})`}
                />
              </g>
              <ellipse
                cx="150"
                cy="150"
                rx="35"
                ry="35"
                fill="none"
                stroke="#0a0a0a"
                strokeWidth="3"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
