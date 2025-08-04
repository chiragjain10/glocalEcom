import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const accordionData = [
  {
    question: "What is the return policy?",
    answer:
      "We offer a 7-day return window for all unused items in original packaging. Refunds are processed within 3–5 working days.",
  },
  {
    question: "Do you offer free shipping?",
    answer:
      "Yes, we provide free shipping across India on orders above ₹999. Standard delivery times apply.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept UPI, debit/credit cards, net banking, Paytm, PhonePe, and COD (Cash on Delivery) for eligible locations.",
  },
  {
    question: "Are your products handmade?",
    answer:
      "Yes, all our products are ethically handcrafted by skilled Indian artisans using sustainable materials.",
  },
];

const AccordionItem = ({ item, isOpen, onClick }) => {
  return (
    <div className="p-3 rounded-md border border-amber-400/50 bg-white/70 backdrop-blur-sm">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center py-4 text-left focus:outline-none cursor-pointer"
      >
        <span className="text-lg font-medium text-gray-800">
          {item.question}
        </span>
        {isOpen ? (
          <FaChevronUp className="text-amber-600" />
        ) : (
          <FaChevronDown className="text-gray-600" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-600 text-sm leading-relaxed">
          {item.answer}
        </div>
      )}
    </div>
  );
};

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className="bg-[#f4f2e9] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Left: Accordion content */}
        <div className="w-full">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center w-full">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {accordionData.map((item, index) => (
              <AccordionItem
                key={index}
                item={item}
                isOpen={index === openIndex}
                onClick={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accordion;
