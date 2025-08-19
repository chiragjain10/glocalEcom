import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaPlus, FaTimes } from "react-icons/fa";

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
    <div className="p-3 border-l-3 rounded border-amber-400 bg-white/70 backdrop-blur-sm">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center py-4 text-left focus:outline-none cursor-pointer"
      >
        <span className="text-lg font-medium text-gray-800">
          {item.question}
        </span>
        <FaPlus
          className={`transition-transform duration-300 text-xl ${
            isOpen ? "rotate-45 text-amber-600" : "text-amber-500"
          }`}
        />
      </button>

      <div
        className="accordion-content transition-max-height duration-300 ease-in-out overflow-hidden"
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
    <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto">
        {/* Heading Outside the Flex Container */}
        <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Frequently Asked&nbsp;
          <span
            className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent"
          >
            Questions
          </span>
        </h2>
          <div className="w-20 h-1.5 bg-amber-500 mx-auto mb-10"></div>
        </div>

        {/* Content + Image Side-by-Side */}
        <div className="bg-white shadow-lg flex flex-col lg:flex-row justify-center items-center gap-10 rounded-md overflow-hidden">
          {/* Left Column: FAQ Content */}
          <div className="flex-1 w-full max-h-[500px] overflow-y-auto scroll-hidden ps-4">
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

          {/* Right Column: Image */}
          <div className="w-full lg:w-[45%]">
            <img
              src="/images/FAQ-removebg-preview.png"
              alt="FAQ Illustration"
              className="w-full rounded-md h-auto  object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accordion;
