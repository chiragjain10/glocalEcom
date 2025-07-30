import React from 'react';
import { FaShippingFast, FaShieldAlt, FaPaintBrush, FaHandHoldingHeart } from 'react-icons/fa';

const features = [
  {
    icon: <FaShippingFast className="text-3xl bg-[linear-gradient(to_right,_#fbbf24,_#f59e0b)] bg-clip-text" />,
    title: 'Fast & Free Delivery',
    description: 'Get your orders delivered safely and quickly across India.',
  },
  {
    icon: <FaShieldAlt className="text-3xl bg-[linear-gradient(to_right,_#fbbf24,_#f59e0b)] bg-clip-text" />,
    title: 'Secure Payments',
    description: 'All transactions are protected with end-to-end encryption.',
  },
  {
    icon: <FaPaintBrush className="text-3xl bg-[linear-gradient(to_right,_#fbbf24,_#f59e0b)] bg-clip-text" />,
    title: 'Authentic Artwork',
    description: 'We deliver original handcrafted Indian art made by skilled artisans.',
  },
  {
    icon: <FaHandHoldingHeart className="text-3xl bg-[linear-gradient(to_right,_#fbbf24,_#f59e0b)] bg-clip-text" />,
    title: 'Customer Satisfaction',
    description: 'We prioritize your happiness and guarantee top-quality service.',
  },
];


const WhyChooseUs = () => {
  return (
    <section className="bg-[#f4f2e9] py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#2c2c2c] mb-12">
          Why Choose Us
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-[#2c2c2c] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
