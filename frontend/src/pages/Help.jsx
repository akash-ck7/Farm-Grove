import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LiveChatWidget from "../components/LiveChatWidget";

const faqs = [
  {
    question: "How do I track my order?",
    answer:
      "You can track your order by going to 'My Orders' in your account and clicking 'Track'.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "Yes, orders can be cancelled within 24 hours of placing them unless already shipped.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach us via email, chat, or phone from the support section below.",
  },
  {
    question: "Is there a return policy?",
    answer: "Yes, we offer a 7-day return policy for eligible products.",
  },
  {
    question: "Can I become a seller?",
    answer:
      "Absolutely! Register as a seller from the registration page to start selling.",
  },
];

const Help = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [search, setSearch] = useState("");

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Help & Support</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search for help..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {/* FAQ */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, index) => (
          <motion.div
            key={index}
            className="border rounded-lg p-4 bg-white shadow"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <button
              className="flex justify-between items-center w-full font-semibold text-left"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span>{activeIndex === index ? "−" : "+"}</span>
            </button>
            {activeIndex === index && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="mt-2 text-gray-600"
              >
                {faq.answer}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Contact Options */}
      <motion.div
        className="mt-10 grid md:grid-cols-3 gap-6"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="bg-blue-100 p-4 rounded-lg shadow text-center">
          <h3 className="font-bold text-lg">📞 Call Support</h3>
          <p className="text-gray-700 mt-2">91+ 9080291768</p>
        </div>
        <div className="bg-purple-200 p-4 rounded-lg shadow text-center">
          <h3 className="font-bold text-lg">💬 Chat with Us</h3>
          <p className="text-gray-700 mt-2">Available 9am–6pm</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow text-center">
          <h3 className="font-bold text-lg">📧 Email</h3>
          <p className="text-gray-700 mt-2">vidhyasagar.s161199@gmail.com</p>
        </div>
      </motion.div>

      <LiveChatWidget />
    </motion.div>
  );
};

export default Help;