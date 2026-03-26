import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RealisticWeightPlate({ position = "top-left" }) {
  const plateRef = useRef(null);
  const isLeft = position === "top-left";

  useEffect(() => {
    if (plateRef.current) {
      const triggerId = `realistic-plate-${position}`;

      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id === triggerId) {
          trigger.kill();
        }
      });

      // Scroll-linked animation - smooth and heavy
      gsap.to(plateRef.current, {
        y: isLeft ? 150 : -150,
        rotateX: isLeft ? 15 : -15,
        rotateY: isLeft ? 20 : -20,
        rotateZ: isLeft ? 10 : -10,
        scale: 1.03,
        ease: "none",
        scrollTrigger: {
          id: triggerId,
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
          markers: false,
        },
      });
    }

    return () => {
      const triggerId = `realistic-plate-${position}`;
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id === triggerId) {
          trigger.kill();
        }
      });
    };
  }, [position, isLeft]);

  const positionStyles = isLeft
    ? { top: "80px", left: "60px" }
    : { bottom: "80px", right: "60px" };

  return (
    <div
      ref={plateRef}
      className="absolute z-10 pointer-events-none"
      style={{
        ...positionStyles,
        width: "320px",
        height: "320px",
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transform: isLeft
            ? "rotateX(-8deg) rotateY(-12deg)"
            : "rotateX(8deg) rotateY(12deg)",
        }}
      >
        {/* Main plate with realistic depth */}
        <svg
          viewBox="0 0 300 300"
          style={{
            width: "100%",
            height: "100%",
            filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.6))",
          }}
        >
          <defs>
            {/* Realistic lighting gradient */}
            <radialGradient id={`plateGradient-${position}`} cx="35%" cy="35%">
              <stop offset="0%" stopColor="#3a3a3a" />
              <stop offset="40%" stopColor="#2a2a2a" />
              <stop offset="70%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </radialGradient>

            {/* Inner ring gradient */}
            <radialGradient id={`innerRing-${position}`} cx="40%" cy="40%">
              <stop offset="0%" stopColor="#2d2d2d" />
              <stop offset="60%" stopColor="#1d1d1d" />
              <stop offset="100%" stopColor="#151515" />
            </radialGradient>

            {/* Bevel highlight */}
            <radialGradient id={`bevelHighlight-${position}`} cx="30%" cy="30%">
              <stop offset="0%" stopColor="#4a4a4a" />
              <stop offset="100%" stopColor="#2a2a2a" />
            </radialGradient>

            {/* Center hole mask */}
            <mask id={`holeMask-${position}`}>
              <rect width="300" height="300" fill="white" />
              <circle cx="150" cy="150" r="35" fill="black" />
            </mask>
          </defs>

          {/* Outer bevel edge */}
          <g mask={`url(#holeMask-${position})`}>
            <circle
              cx="150"
              cy="150"
              r="148"
              fill={`url(#bevelHighlight-${position})`}
            />

            {/* Main plate surface */}
            <circle
              cx="150"
              cy="150"
              r="140"
              fill={`url(#plateGradient-${position})`}
            />

            {/* Subtle outer ring */}
            <circle
              cx="150"
              cy="150"
              r="120"
              fill="none"
              stroke="#0f0f0f"
              strokeWidth="1"
              opacity="0.4"
            />

            {/* Inner raised ring */}
            <circle
              cx="150"
              cy="150"
              r="100"
              fill={`url(#innerRing-${position})`}
            />

            {/* Inner detail ring */}
            <circle
              cx="150"
              cy="150"
              r="85"
              fill="none"
              stroke="#0a0a0a"
              strokeWidth="1"
              opacity="0.3"
            />
          </g>

          {/* Center hole with depth */}
          <circle cx="150" cy="150" r="35" fill="#000000" />
          <circle
            cx="150"
            cy="150"
            r="35"
            fill="none"
            stroke="#0a0a0a"
            strokeWidth="4"
            opacity="0.6"
          />
          <circle
            cx="150"
            cy="150"
            r="32"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="1"
            opacity="0.4"
          />

          {/* Curved text paths */}
          <defs>
            <path
              id={`topCurve-${position}`}
              d="M 45,150 A 105,105 0 0,1 255,150"
            />
            <path
              id={`bottomCurve-${position}`}
              d="M 255,150 A 105,105 0 0,1 45,150"
            />
          </defs>

          {/* INSHAPE text on top curve - engraved look */}
          <text
            fill="#ffffff"
            fontSize="44"
            fontWeight="900"
            letterSpacing="3"
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              paintOrder: "stroke fill",
            }}
          >
            <textPath
              href={`#topCurve-${position}`}
              startOffset="50%"
              textAnchor="middle"
            >
              INSHAPE
            </textPath>
          </text>

          {/* INSHAPE text on bottom curve */}
          <text
            fill="#ffffff"
            fontSize="44"
            fontWeight="900"
            letterSpacing="3"
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              paintOrder: "stroke fill",
            }}
          >
            <textPath
              href={`#bottomCurve-${position}`}
              startOffset="50%"
              textAnchor="middle"
            >
              INSHAPE
            </textPath>
          </text>

          {/* 25 KG on left side */}
          <text
            x="75"
            y="145"
            fill="#ffffff"
            fontSize="18"
            fontWeight="800"
            textAnchor="middle"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            25
          </text>
          <text
            x="75"
            y="162"
            fill="#ffffff"
            fontSize="13"
            fontWeight="700"
            textAnchor="middle"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            KG
          </text>

          {/* 25 KG on right side */}
          <text
            x="225"
            y="145"
            fill="#ffffff"
            fontSize="18"
            fontWeight="800"
            textAnchor="middle"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            25
          </text>
          <text
            x="225"
            y="162"
            fill="#ffffff"
            fontSize="13"
            fontWeight="700"
            textAnchor="middle"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            KG
          </text>

          {/* Edge highlight for 3D effect */}
          <circle
            cx="150"
            cy="150"
            r="148"
            fill="none"
            stroke="url(#bevelHighlight-${position})"
            strokeWidth="2"
            opacity="0.3"
          />
        </svg>
      </div>
    </div>
  );
}
