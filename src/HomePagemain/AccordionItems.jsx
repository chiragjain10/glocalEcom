import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

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
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState("0px");

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setContentHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setContentHeight("0px");
    }
  }, [isOpen]);

  return (
    <div className="p-3 rounded-md border border-amber-400/50 bg-white/70 backdrop-blur-sm">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center py-4 text-left focus:outline-none cursor-pointer"
      >
        <span className="text-lg font-medium text-gray-800">
          {item.question}
        </span>
        <FaChevronDown
          className={`rotate-icon ${isOpen ? "open text-amber-600" : "text-gray-600"
            }`}
        />
      </button>

      {/* Accordion content with fixed height and scroll */}
      <div
        className="accordion-content"
        style={{
          maxHeight: isOpen ? contentHeight : "0px",
        }}
      >
        <div
          ref={contentRef}
          className="overflow-y-auto max-h-32 text-gray-600 text-sm leading-relaxed pr-1"
        >
          {item.answer}
        </div>
      </div>
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
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 h-[500px] overflow-y-auto scroll-hidden">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Frequently Asked Questions
        </h2>
        <div className="w-full space-y-4">
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
    </section>
  );
};

export default Accordion;