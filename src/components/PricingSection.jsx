import { useState } from "react";
import { Check } from "lucide-react";

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small gyms and personal trainers",
      monthlyPrice: 499,
      yearlyPrice: 4990,
      features: [
        "Up to 50 Members",
        "Basic Member Management",
        "Attendance Tracking",
        "Email Support",
      ],
      buttonText: "Get Started",
      isPopular: false,
    },
    {
      name: "Pro",
      description: "Best for growing gyms and fitness studios",
      monthlyPrice: 1499,
      yearlyPrice: 14990,
      features: [
        "Up to 300 Members",
        "Advanced Analytics Dashboard",
        "Payment & Subscription Tracking",
        "WhatsApp Notifications",
        "Priority Support",
      ],
      buttonText: "Upgrade Now",
      isPopular: true,
    },
    {
      name: "Enterprise",
      description: "For large gyms and multi-branch fitness chains",
      monthlyPrice: 3499,
      yearlyPrice: 34990,
      features: [
        "Unlimited Members",
        "Multi-Branch Management",
        "Staff & Role Management",
        "API Access",
        "Dedicated Account Manager",
      ],
      buttonText: "Contact Sales",
      isPopular: false,
    },
  ];

  return (
    <section className="relative w-full bg-[#0a0a0a] py-24 sm:py-32 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFD600]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Flexible Plans for Every Gym
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg mb-10 leading-relaxed">
            Choose a plan that fits your fitness business and scale effortlessly.
          </p>

          {/* Toggle Switch */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-semibold transition-colors ${!isYearly ? "text-white" : "text-neutral-500"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-16 h-8 rounded-full bg-neutral-800 border border-white/10 p-1 transition-colors hover:border-white/20 focus:outline-none"
            >
              <div
                className={`w-6 h-6 bg-[#FFD600] rounded-full shadow-md transition-transform duration-300 ease-in-out ${
                  isYearly ? "translate-x-8" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-sm font-semibold transition-colors ${isYearly ? "text-white" : "text-neutral-500"}`}>
              Yearly <span className="text-[#FFD600] ml-1 text-xs px-2 py-0.5 bg-[#FFD600]/10 rounded-full">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
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
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-neutral-400 min-h-[40px] leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white">
                  ₹{isYearly ? plan.yearlyPrice.toLocaleString() : plan.monthlyPrice.toLocaleString()}
                </span>
                <span className="text-neutral-500 font-medium">
                  /{isYearly ? "year" : "month"}
                </span>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="text-[#FFD600] shrink-0 mt-0.5" size={18} strokeWidth={3} />
                    <span className="text-neutral-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
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
    </section>
  );
}
