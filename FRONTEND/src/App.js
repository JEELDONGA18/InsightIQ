
import './App.css';
import HeroSection from './components/LandingPage/HeroSection';
import FeaturesSection from './components/LandingPage/FeaturesSection';
import DashboardPreview from './components/LandingPage/DashboardPreview';
import BenefitsSection from './components/LandingPage/BenefitsSection';
import CTASection from './components/LandingPage/CTASection';
import Footer from './components/Footer';


function App() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <DashboardPreview />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;
