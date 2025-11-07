import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from './use-toast';
import Toast from './toast';

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className="pointer-events-auto"
          >
            <Toast
              {...toast}
              onClose={dismiss}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default Toaster;
