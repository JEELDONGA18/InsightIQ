import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { motion } from "framer-motion";

const Sidebar = ({ role }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = {
    admin: [
      { name: "Dashboard", path: "/admin/dashboard" },
      { name: "Department Heads", path: "/admin/dept-heads" },
      { name: "Employees", path: "/admin/employees" },
      { name: "Settings", path: "/admin/settings" },
    ],
    deptHead: [
      { name: "Dashboard", path: "/dept/dashboard" },
      { name: "Team Members", path: "/dept/team" },
      { name: "Projects", path: "/dept/projects" },
      { name: "Settings", path: "/dept/settings" },
    ],
    employee: [
      { name: "Dashboard", path: "/employee/dashboard" },
      { name: "Tasks", path: "/employee/tasks" },
      { name: "Reports", path: "/employee/reports" },
      { name: "Settings", path: "/employee/settings" },
    ],
  };

  const roleLinks = links[role] || [];

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-[#0b0c10] border-b border-cyan-500/20 text-white">
        <h1 className="font-bold text-xl tracking-wide">InsightIQ</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-cyan-500/10 transition"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: isOpen || window.innerWidth >= 768 ? 0 : -250 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 h-full w-64 bg-[#0b0c10]/95 text-white shadow-[0_0_25px_rgba(0,255,255,0.1)] border-r border-cyan-400/20 z-50 flex flex-col justify-between md:translate-x-0"
      >
        {/* Top Section (Logo + Nav) */}
        <div>
          {/* Glowing Logo */}
          <div className="relative px-8 py-8 border-b border-cyan-400/20">
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -inset-4 bg-cyan-500/20 blur-3xl rounded-full"
            ></motion.div>

            <h2 className="relative text-2xl font-extrabold tracking-wider">
              <span className="text-cyan-400 drop-shadow-[0_0_12px_rgba(0,255,255,0.7)]">
                Insight
              </span>
              <span className="text-white">IQ</span>
            </h2>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 space-y-1">
            {roleLinks.map((link, idx) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={idx}
                  to={link.path}
                  className={`block relative px-6 py-3 mx-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-r from-cyan-500/20 to-transparent text-cyan-400 border-l-4 border-cyan-400 shadow-[inset_0_0_10px_rgba(0,255,255,0.3)]"
                      : "text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout Button at Bottom */}
        <div className="p-6 border-t border-gray-800">
          <button className="w-full px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg shadow-md font-medium">
            Logout
          </button>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
