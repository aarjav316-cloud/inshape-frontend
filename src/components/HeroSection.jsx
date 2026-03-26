export default function HeroSection() {
  return (
    <section className="hero-section relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full animate-[zoomIn_20s_ease-in-out_infinite_alternate]">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
          alt="Modern gym interior"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Subtle dark overlay for text readability */}
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/40 to-black/30" />

      {/* Center Text Content */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">
        <div className="w-full text-center flex flex-col items-center max-w-6xl">
          {/* Main Heading with yellow outline */}
          <div className="relative mb-8 sm:mb-10 md:mb-12 animate-[fadeInUp_1s_ease-out]">
            <h1
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-tight leading-tight"
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                letterSpacing: "0.02em",
                WebkitTextStroke: "1px #FFD600",
                paintOrder: "stroke fill",
                textShadow:
                  "0 0 30px rgba(255, 214, 0, 0.3), 0 4px 20px rgba(0, 0, 0, 0.6)",
              }}
            >
              INSHAPE FITNESS
            </h1>

            {/* Yellow underline accent */}
            <div className="flex justify-center mt-3 sm:mt-4">
              <div className="w-20 sm:w-24 md:w-32 h-0.5 sm:h-1 bg-[#FFD600] rounded-full animate-[expandWidth_1.2s_ease-out_0.3s_both]" />
            </div>
          </div>

          {/* Subtext */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5 w-full flex flex-col items-center px-2">
            <p
              className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold max-w-4xl animate-[fadeInUp_1s_ease-out_0.4s_both]"
              style={{
                color: "#FFD600",
                lineHeight: "1.5",
                textShadow: "0 2px 15px rgba(0, 0, 0, 0.8)",
                letterSpacing: "0.5px",
                textAlign: "center",
              }}
            >
              Train harder.{" "}
              <span className="text-white font-bold">Get stronger.</span>
            </p>
            <p
              className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold max-w-4xl animate-[fadeInUp_1s_ease-out_0.6s_both]"
              style={{
                color: "#FFD600",
                lineHeight: "1.5",
                textShadow: "0 2px 15px rgba(0, 0, 0, 0.8)",
                letterSpacing: "0.5px",
                textAlign: "center",
              }}
            >
              Push{" "}
              <span
                className="text-white font-bold"
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "#FFD600",
                  textDecorationThickness: "2px",
                  textUnderlineOffset: "4px",
                }}
              >
                beyond
              </span>{" "}
              your limits.
            </p>
            <p
              className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold max-w-4xl animate-[fadeInUp_1s_ease-out_0.8s_both]"
              style={{
                color: "#FFD600",
                lineHeight: "1.5",
                textShadow: "0 2px 15px rgba(0, 0, 0, 0.8)",
                letterSpacing: "0.5px",
                textAlign: "center",
              }}
            >
              Built for{" "}
              <span className="text-white font-bold italic">discipline</span>{" "}
              and <span className="text-white font-bold italic">results</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
