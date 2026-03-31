import HeroSection from "../components/HeroSection";
import BottomNavbar from "../components/BottomNavbar";
import BrandSection from "../components/BrandSection";
import TrainersSection from "../components/TrainersSection";
import PricingSection from "../components/PricingSection";
import Footer from "../components/Footer";
function Home() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <div className="hero-section relative w-full h-screen">
        <HeroSection />
      </div>
      <BrandSection />
      <TrainersSection />
      <PricingSection />
      <Footer />
      <BottomNavbar />
    </div>
  );
}

export default Home;
