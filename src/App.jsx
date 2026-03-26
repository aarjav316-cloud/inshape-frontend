import HeroSection from "./components/HeroSection";
import BottomNavbar from "./components/BottomNavbar";
import BrandSection from "./components/BrandSection";
import TrainersSection from "./components/TrainersSection";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <>
      <div className="hero-section relative w-full h-screen">
        <HeroSection />
      </div>
      <BrandSection />
      <TrainersSection />
      {/* Spacer between sections with matching background */}
      <div className="w-full h-32 sm:h-40 md:h-48 lg:h-56 bg-[#0a0a0a]" />
      <Footer />
      <BottomNavbar />
    </>
  );
}

export default App;
