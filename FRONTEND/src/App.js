import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
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
import DeptDashboard from "./pages/Department/DeptDashboard";
import Reports from "./pages/Department/Reports";
import { useDepartments } from "./context/DepartmentContext.js";
import { useEffect } from "react";
import { LogOut } from "lucide-react";

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
  const { user, departmentName, loading, logoutToogle, setLogoutToggle } = useDepartments();
  console.log(departmentName);
  const navigate = useNavigate();

  useEffect(() => {
    if (logoutToogle) {
      navigate("/", { replace: true });
      setLogoutToggle(false);
    }
  }, [logoutToogle]);

  if (loading) {
    return <div className="text-center text-white mt-10">Loading...</div>;
  }

  return (
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
            <Route path="/admin/settings" element={<AdminSettings />} />

            <Route path="/department/dashboard" element={<DeptDashboard />} />
            <Route
              path="/department/dashboard/:id"
              element={<DeptDashboard />}
            />
            <Route path="/department/reports" element={<Reports />} />
          </>
        )}

        {/* Non-admin department users (access only department routes) */}
        {user && departmentName && departmentName !== "admin" && (
          <>
            <Route path="/department/dashboard" element={<DeptDashboard />} />
            <Route
              path="/department/dashboard/:id"
              element={<DeptDashboard />}
            />
            <Route path="/department/reports" element={<Reports />} />
          </>
        )}

        {/* Redirects */}
        {/* Logged-in admin trying to access auth pages → redirect to dashboard */}
        {user && departmentName === "admin" && (
          <>
            <Route
              path="/"
              element={<Navigate to="/admin/dashboard" replace />}
            />
            <Route
              path="/login"
              element={<Navigate to="/admin/dashboard" replace />}
            />
          </>
        )}

        {/* Logged-in non-admin trying to access auth pages → redirect to department dashboard */}
        {user && departmentName && departmentName !== "admin" && (
          <>
            <Route
              path="/"
              element={<Navigate to="/department/dashboard" replace />}
            />
            <Route
              path="/login"
              element={<Navigate to="/department/dashboard" replace />}
            />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
