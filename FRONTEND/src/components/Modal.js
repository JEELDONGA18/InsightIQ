// src/components/Modal.js
import React from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <div className="relative w-full max-w-lg bg-gray-900/95 border border-cyan-500/50 rounded-2xl shadow-[0_0_30px_rgba(0,255,255,0.3)] p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4 border-b border-cyan-500/30 pb-2">
            <h2 className="text-xl font-bold text-cyan-200">{title}</h2>
            <button
              onClick={onClose}
              className="text-cyan-400 hover:text-cyan-100 transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          {/* Content */}
          <div className="text-cyan-100">{children}</div>
        </div>
      </motion.div>
    </>
  );
};

export default Modal;