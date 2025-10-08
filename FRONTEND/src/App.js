
import './App.css';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import DashboardPreview from './components/DashboardPreview';
import BenefitsSection from './components/BenefitsSection';
import CTASection from './components/CTASection';
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
