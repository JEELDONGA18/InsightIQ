import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/LandingPage/Navbar';
import HeroSection from './components/LandingPage/HeroSection';
import FeaturesSection from './components/LandingPage/FeaturesSection';
import DashboardPreview from './components/LandingPage/DashboardPreview';
import BenefitsSection from './components/LandingPage/BenefitsSection';
import CTASection from './components/LandingPage/CTASection';
import Footer from './components/LandingPage/Footer';
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

const LandingPage = () => (
  <>
    <Navbar />
    <HeroSection />
    <FeaturesSection />
    <DashboardPreview />
    <BenefitsSection />
    <CTASection />
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <div className="bg-white dark:bg-gray-900 min-h-screen flex flex-col">
        <Routes> 
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;