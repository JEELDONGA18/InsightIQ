import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Landing page components
import Navbar from './components/LandingPage/Navbar';
import HeroSection from './components/LandingPage/HeroSection';
import FeaturesSection from './components/LandingPage/FeaturesSection';
import DashboardPreview from './components/LandingPage/DashboardPreview';
import BenefitsSection from './components/LandingPage/BenefitsSection';
import CTASection from './components/LandingPage/CTASection';
import Footer from './components/LandingPage/Footer';

// Auth pages
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

// Admin Section 
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminSettings from "./pages/Admin/AdminSettings"; 
import DeptHeads from "./pages/Admin/DeptHeads";
import Employees from "./pages/Admin/Employees";

// Department Section 
import DeptDashboard from "./pages/Department/DeptDashboard";
import DeptEmployees from "./pages/Department/DeptEmployees";
import Reports from "./pages/Department/Reports";

// Employee Section 
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard";
import Profile from "./pages/Employee/Profile";
import Tasks from "./pages/Employee/Tasks";

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

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/dept-heads" element={<DeptHeads />} />
          <Route path="/admin/employees" element={<Employees />} />
          <Route path="/admin/settings" element={<AdminSettings />} />

          {/* Department Routes */}
          <Route path="/department/dashboard" element={<DeptDashboard />} />
          <Route path="/department/employees" element={<DeptEmployees />} />
          <Route path="/department/reports" element={<Reports />} />\

          {/* Employee Routes */}
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="/employee/profile" element={<Profile />} />
          <Route path="/employee/tasks" element={<Tasks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;