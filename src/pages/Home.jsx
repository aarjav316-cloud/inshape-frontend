import { useState, useEffect } from "react";
import { Phone, X } from "lucide-react";
import HeroSection from "../components/HeroSection";
import BottomNavbar from "../components/BottomNavbar";
import BrandSection from "../components/BrandSection";
import TrainersSection from "../components/TrainersSection";
import PricingSection from "../components/PricingSection";
import Footer from "../components/Footer";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Disable background scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const handleCallNow = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <div className="hero-section relative w-full h-screen">
        <HeroSection />
      </div>
      <BrandSection />
      <TrainersSection />
      <PricingSection />
      <Footer onContactClick={() => setIsModalOpen(true)} />
      <BottomNavbar onContactClick={() => setIsModalOpen(true)} />

      {/* Contact Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md bg-gradient-to-br from-white/10 to-black/30 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-black/40 animate-in zoom-in-95 duration-300 ease-in-out hover:border-yellow-400/30 transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
            >
              <X size={24} />
            </button>

            {/* Content */}
            <div className="text-center">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Get Started Today
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Connect with us and choose a plan that fits your fitness
                  goals.
                </p>
              </div>

              {/* Contact Numbers */}
              <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/5 shadow-inner">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Phone className="text-yellow-400" size={20} />
                  <span className="text-gray-300 text-sm font-medium">
                    Contact Us
                  </span>
                </div>
                <div className="space-y-2">
                  <a
                    href="tel:7566884737"
                    className="block text-yellow-400 font-semibold text-lg hover:text-yellow-300 hover:underline transition-all"
                  >
                    7566884737
                  </a>
                  <a
                    href="tel:8770906187"
                    className="block text-yellow-400 font-semibold text-lg hover:text-yellow-300 hover:underline transition-all"
                  >
                    8770906187
                  </a>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleCallNow("7566884737")}
                  className="flex-1 bg-yellow-400 text-black font-semibold px-5 py-3 rounded-lg hover:bg-yellow-300 transition-all duration-300 active:scale-95 shadow-lg hover:shadow-yellow-400/30"
                >
                  Call Now
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-transparent text-gray-400 font-semibold px-5 py-3 rounded-lg hover:text-white hover:bg-white/5 border border-white/10 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
