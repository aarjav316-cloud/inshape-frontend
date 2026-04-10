import { useState, useEffect } from "react";
import { Check, Phone, X } from "lucide-react";

export default function PricingSection() {
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
  const plans = [
    {
      name: "Monthly",
      description: "Perfect for trying out our gym",
      price: 1000,
      duration: "1 Month",
      features: [
        "1 Month Access",
        "All Equipment Access",
        "Locker Facility",
        "Diet Consultation",
        "Progress Tracking",
      ],
      buttonText: "Get Started",
      isPopular: false,
    },
    {
      name: "3 Months",
      description: "Best for building consistent habits",
      price: 2500,
      duration: "3 Months",
      features: [
        "3 Months Access",
        "All Equipment Access",
        "Locker Facility",
        "Diet Consultation",
        "Progress Tracking",
      ],
      buttonText: "Choose Plan",
      isPopular: true,
    },
    {
      name: "6 Months",
      description: "Great value for serious fitness goals",
      price: 4500,
      duration: "6 Months",
      features: [
        "6 Months Access",
        "All Equipment Access",
        "Locker Facility",
        "Diet Consultation",
        "Progress Tracking",
      ],
      buttonText: "Choose Plan",
      isPopular: false,
    },
    {
      name: "Yearly",
      description: "Best value for committed fitness enthusiasts",
      price: 8000,
      duration: "12 Months",
      features: [
        "12 Months Access",
        "All Equipment Access",
        "Locker Facility",
        "Diet Consultation",
        "Progress Tracking",
      ],
      buttonText: "Choose Plan",
      isPopular: false,
    },
  ];

  return (
    <section
      id="pricing"
      className="relative w-full bg-[#0a0a0a] py-24 sm:py-32 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFD600]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Membership Plans
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
            Choose the perfect plan for your fitness journey at INSHAPE FITNESS
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col bg-[#111] backdrop-blur-xl rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                plan.isPopular
                  ? "border border-[#FFD600] shadow-[0_0_40px_rgba(255,214,0,0.15)]"
                  : "border border-white/10 hover:border-white/20 shadow-xl"
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFD600] text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-neutral-400 min-h-[40px] leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white">
                  ₹{plan.price.toLocaleString()}
                </span>
                <span className="text-neutral-500 font-medium">
                  /{plan.duration}
                </span>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      className="text-[#FFD600] shrink-0 mt-0.5"
                      size={18}
                      strokeWidth={3}
                    />
                    <span className="text-neutral-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setIsModalOpen(true)}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-300 active:scale-95 ${
                  plan.isPopular
                    ? "bg-[#FFD600] text-black hover:bg-[#e6c100] shadow-[0_4px_14px_0_rgba(255,214,0,0.39)] hover:shadow-[0_6px_20px_rgba(255,214,0,0.23)]"
                    : "bg-transparent text-white border border-white/20 hover:bg-white inset-0 hover:text-black hover:border-white"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
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
    </section>
  );
}
