import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/LandingPage/Navbar";
import HeroSection from "./components/LandingPage/HeroSection";
import FeaturesSection from "./components/LandingPage/FeaturesSection";
import DashboardPreview from "./components/LandingPage/DashboardPreview";
import BenefitsSection from "./components/LandingPage/BenefitsSection";
import CTASection from "./components/LandingPage/CTASection";
import Footer from "./components/LandingPage/Footer";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminSettings from "./pages/Admin/AdminSettings";
import DeptHeads from "./pages/Admin/DeptHeads";
import Employees from "./pages/Admin/Employees";
import DeptDashboard from "./pages/Department/DeptDashboard";
import DeptEmployees from "./pages/Department/DeptEmployees";
import Reports from "./pages/Department/Reports";
import { useDepartments } from "./context/DepartmentContext.js";

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
  const { user, departmentName, loading } = useDepartments();
  console.log(departmentName);
  

  if (loading) {
    return <div className="text-center text-white mt-10">Loading...</div>;
  }

  return (
    <Router>
      <div className="bg-white dark:bg-gray-900 min-h-screen flex flex-col">
        <Toaster />

        <Routes>
          {!user && (
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </>
          )}

          {/* Admin users (full access to admin + department routes) */}
          {user && departmentName === "admin" && (
            <>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/department" element={<DeptHeads />} />
              <Route path="/admin/employees" element={<Employees />} />
              <Route path="/admin/settings" element={<AdminSettings />} />

              <Route path="/department/dashboard" element={<DeptDashboard />} />
              <Route path="/department/dashboard/:id" element={<DeptDashboard />} />
              <Route path="/department/employees" element={<DeptEmployees />} />
              <Route path="/department/reports" element={<Reports />} />
            </>
          )}

          {/* Non-admin department users (access only department routes) */}
          {user && departmentName && departmentName !== "admin" && (
            <>
              <Route path="/department/dashboard" element={<DeptDashboard />} />
              <Route path="/department/dashboard/:id" element={<DeptDashboard />} />
              <Route path="/department/employees" element={<DeptEmployees />} />
              <Route path="/department/reports" element={<Reports />} />
            </>
          )}

          {/* Redirects */}
          {/* Logged-in admin trying to access auth pages → redirect to dashboard */}
          {user && departmentName === "admin" && (
            <>
              <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/login" element={<Navigate to="/admin/dashboard" replace />} />
            </>
          )}

          {/* Logged-in non-admin trying to access auth pages → redirect to department dashboard */}
          {user && departmentName && departmentName !== "admin" && (
            <>
              <Route path="/" element={<Navigate to="/department/dashboard" replace />} />
              <Route path="/login" element={<Navigate to="/department/dashboard" replace />} />
            </>
          )}
        </Routes>
      </div>
    </Router> 
  );
}

export default App;
