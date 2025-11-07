import React from 'react';
import { motion } from 'framer-motion';
import {
  FaShippingFast,
  FaShieldAlt,
  FaPaintBrush,
  FaHandHoldingHeart,
  FaStar,
  FaCheckCircle,
} from 'react-icons/fa';
import { GiIndiaGate, GiSparkles } from 'react-icons/gi';

const features = [
  {
    icon: <FaShippingFast className="text-white text-3xl" />,
    title: 'Fast & Free Delivery',
    description: 'Get your orders delivered safely and quickly across India with our premium logistics network.',
    highlight: 'Free Shipping',
    stats: '24-48 Hours',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'from-blue-400/20 to-blue-500/20',
    borderColor: 'border-blue-400/30'
  },
  {
    icon: <FaShieldAlt className="text-white text-3xl" />,
    title: 'Secure Payments',
    description: 'All transactions are protected with military-grade encryption and secure payment gateways.',
    highlight: '100% Secure',
    stats: 'SSL Protected',
    color: 'from-green-500 to-green-600',
    bgColor: 'from-green-400/20 to-green-500/20',
    borderColor: 'border-green-400/30'
  },
  {
    icon: <FaPaintBrush className="text-white text-3xl" />,
    title: 'Authentic Artwork',
    description: 'We deliver original handcrafted Indian art made by certified master artisans with heritage.',
    highlight: 'Certified',
    stats: 'Heritage Grade',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'from-amber-400/20 to-orange-500/20',
    borderColor: 'border-amber-400/30'
  },
  {
    icon: <FaHandHoldingHeart className="text-white text-3xl" />,
    title: 'Customer Satisfaction',
    description: 'We prioritize your happiness with personalized service and quality guarantees.',
    highlight: 'Premium',
    stats: '5★ Rated',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-400/20 to-pink-500/20',
    borderColor: 'border-purple-400/30'
  },
];

const WhyChooseUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { rotate: -180, scale: 0 },
    visible: {
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "backOut"
      }
    }
  };

  return (

    <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 backdrop-blur-sm py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Premium background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-400/5 to-orange-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-64 h-64 bg-gradient-to-tr from-purple-400/5 to-pink-500/5 rounded-full blur-3xl"
        />

                    </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Premium Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          {/* Premium badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg mb-6"
          >
            <GiSparkles className="text-white" />
            Premium Experience
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-4 sm:mb-6 font-serif leading-tight px-4"
          >
            Why Choose{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              GlocalShip
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="w-32 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full shadow-lg"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg md:text-xl text-gray-600 mt-4 sm:mt-6 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Experience the pinnacle of Indian craftsmanship with our curated collection of authentic, 
            heritage-grade artifacts and handcrafted masterpieces.
          </motion.p>
        </motion.div>

        {/* Premium Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4 sm:px-0"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              {/* Premium Card */}
              <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 sm:p-8 border border-gray-100 overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Premium border glow */}
                <div className={`absolute inset-0 rounded-3xl border-2 ${feature.borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Icon Container */}
                <motion.div
                  variants={iconVariants}
                  className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500`}
                >
                {feature.icon}
                  {/* Icon glow effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500`} />
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Highlight badge */}
                  <div className="inline-flex items-center gap-2 bg-gray-100 group-hover:bg-white/80 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 mb-4 transition-colors duration-300">
                    <FaCheckCircle className="text-green-500 text-sm" />
                    {feature.highlight}
              </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">
                {feature.title}
              </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 font-medium">
                      {feature.stats}
                    </div>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-amber-400 text-sm" />
                      <FaStar className="text-amber-400 text-sm" />
                      <FaStar className="text-amber-400 text-sm" />
                      <FaStar className="text-amber-400 text-sm" />
                      <FaStar className="text-amber-400 text-sm" />
            </div>
        </div>
                </div>

                {/* Premium corner accent */}
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${feature.color} opacity-10 rounded-bl-3xl`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Premium Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 lg:mt-20 text-center px-4"
        >
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border border-amber-200/30">
            <div className="flex items-center justify-center mb-6">
              <GiIndiaGate className="text-amber-500 text-4xl md:text-5xl mr-4" />
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                Heritage Meets Innovation
              </h3>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Every piece tells a story of India's rich cultural heritage, carefully curated and 
              delivered with modern convenience and premium service standards.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
