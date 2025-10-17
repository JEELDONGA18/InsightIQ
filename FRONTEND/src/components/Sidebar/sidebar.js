import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, Home, Users, Settings, Clipboard, icons } from "lucide-react"; // import needed icons
import { motion } from "framer-motion";
import { useDepartments } from "../../context/DepartmentContext";

const Sidebar = ({ role }) => {
  const { departments } = useDepartments();
  console.log("departments in sidebar", departments);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const match = location.pathname.match(/\/department\/dashboard\/([^/]+)/);
  const currentDeptId = match ? match[1] : departments?.[0]?._id;
  const {logout} = useDepartments();

  // Sidebar links with icons
  const links = {
    admin: [
      { name: "Dashboard", path: "/admin/dashboard", icon: Home },
      { name: "Department", path: "/admin/department", icon: Users },
      { name: "Employee", path: "/admin/employee", icon: Users },
      { name: "Settings", path: "/admin/settings", icon: Settings },
    ],
    deptHead: [
      {
        name: "Dashboard",
        path: `/department/dashboard/${currentDeptId}`,
        icon: Home,
      },
      {
        name: "Reports",
        path: `/department/reports/${currentDeptId}`,
        icon: Clipboard,
      },
    ],
  };

  const roleLinks = links[role] || [];

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-gray-950 border-b border-gray-800 text-gray-100">
        <h1 className="font-bold text-xl tracking-wide">InsightIQ</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-gray-800 transition"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -260 }}
        animate={{ x: isOpen || window.innerWidth >= 768 ? 0 : -260 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 h-full w-64 bg-gray-950/95 text-gray-200 border-r border-gray-800 z-50 flex flex-col justify-between md:translate-x-0 shadow-lg"
      >
        {/* Logo + Navigation */}
        <div>
          {/* Logo Section */}
          <div className="px-8 py-6 border-b border-gray-800">
            <h2 className="text-2xl font-bold tracking-wide">
              <span className="text-cyan-400">Insight</span>
              <span className="text-gray-100">IQ</span>
            </h2>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1">
            {roleLinks.map((link, idx) => {
              const active = location.pathname === link.path;
              const Icon = link.icon; // Get the icon component
              return (
                <Link
                  key={idx}
                  to={link.path}
                  className={`flex items-center px-6 py-3 mx-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-gray-800 text-cyan-400 border-l-4 border-cyan-400"
                      : "text-gray-400 hover:text-cyan-400 hover:bg-gray-800/60"
                  }`}
                >
                  <Icon size={18} className="mr-3" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-6 border-t border-gray-800">
          <button onClick={logout} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-cyan-600 text-gray-100 font-medium rounded-lg transition-all duration-300">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
