import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import { cn } from '../../lib/utils';

const toastVariants = {
  hidden: { 
    opacity: 0, 
    y: 50, 
    scale: 0.8,
    x: 20
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: { 
    opacity: 0, 
    y: -50, 
    scale: 0.8,
    x: 20,
    transition: {
      duration: 0.2
    }
  }
};

const Toast = ({ 
  id, 
  type = 'success', 
  title, 
  description, 
  icon, 
  duration = 4000, 
  onClose,
  className,
  ...props 
}) => {
  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-green-500 to-emerald-600',
          border: 'border-green-400/30',
          icon: <FiCheck className="w-5 h-5 text-white" />,
          shadow: 'shadow-green-500/25'
        };
      case 'error':
        return {
          bg: 'bg-gradient-to-r from-red-500 to-pink-600',
          border: 'border-red-400/30',
          icon: <FiX className="w-5 h-5 text-white" />,
          shadow: 'shadow-red-500/25'
        };
      case 'warning':
        return {
          bg: 'bg-gradient-to-r from-amber-500 to-orange-600',
          border: 'border-amber-400/30',
          icon: <FiStar className="w-5 h-5 text-white" />,
          shadow: 'shadow-amber-500/25'
        };
      case 'info':
        return {
          bg: 'bg-gradient-to-r from-blue-500 to-indigo-600',
          border: 'border-blue-400/30',
          icon: <FiShoppingCart className="w-5 h-5 text-white" />,
          shadow: 'shadow-blue-500/25'
        };
      case 'cart':
        return {
          bg: 'bg-gradient-to-r from-amber-500 to-orange-600',
          border: 'border-amber-400/30',
          icon: <FiShoppingCart className="w-5 h-5 text-white" />,
          shadow: 'shadow-amber-500/25'
        };
      case 'wishlist':
        return {
          bg: 'bg-gradient-to-r from-pink-500 to-rose-600',
          border: 'border-pink-400/30',
          icon: <FiHeart className="w-5 h-5 text-white" />,
          shadow: 'shadow-pink-500/25'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-gray-600 to-gray-700',
          border: 'border-gray-500/30',
          icon: <FiCheck className="w-5 h-5 text-white" />,
          shadow: 'shadow-gray-500/25'
        };
    }
  };

  const styles = getToastStyles();

  React.useEffect(() => {
    if (duration !== Infinity) {
      const timer = setTimeout(() => {
        onClose?.(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, id, onClose]);

  return (
    <motion.div
      layout
      variants={toastVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        "relative overflow-hidden rounded-2xl border backdrop-blur-sm",
        "min-w-[320px] max-w-[420px] p-4",
        "shadow-2xl",
        styles.bg,
        styles.border,
        styles.shadow,
        className
      )}
      {...props}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            {icon || styles.icon}
          </div>
        </div>

        {/* Text content */}
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="text-sm font-semibold text-white mb-1 leading-tight">
              {title}
            </h4>
          )}
          {description && (
            <p className="text-sm text-white/90 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={() => onClose?.(id)}
          className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 flex items-center justify-center group"
        >
          <FiX className="w-3 h-3 text-white group-hover:scale-110 transition-transform duration-200" />
        </button>
      </div>

      {/* Progress bar */}
      {duration !== Infinity && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <motion.div
            className="h-full bg-white/60 rounded-r-full"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: duration / 1000, ease: "linear" }}
          />
        </div>
      )}
    </motion.div>
  );
};

export default Toast;
