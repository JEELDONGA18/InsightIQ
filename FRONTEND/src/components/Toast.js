// src/components/Toast.js
import React, { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ type = "success", message, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="text-cyan-400 mr-2" />,
    error: <AlertCircle className="text-red-400 mr-2" />,
    info: <Info className="text-blue-400 mr-2" />,
  };

  const bgColors = {
    success: "bg-gray-900 border-l-4 border-cyan-400",
    error: "bg-gray-900 border-l-4 border-red-500",
    info: "bg-gray-900 border-l-4 border-blue-400",
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 50, scale: 0.9 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`fixed top-5 right-5 flex items-center px-5 py-3 rounded-2xl shadow-[0_0_25px_rgba(0,255,255,0.3)] backdrop-blur-md ${bgColors[type]} text-white z-50`}
        >
          {icons[type]}
          <span className="text-sm font-medium">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;