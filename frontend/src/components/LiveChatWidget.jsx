// src/components/LiveChatWidget.jsx
import React, { useState, useEffect, useRef } from "react";

const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chat, setChat] = useState(() => {
    const stored = localStorage.getItem("chatHistory");
    return stored ? JSON.parse(stored) : [];
  });
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMessage = { sender: "user", text };
    const newChat = [...chat, userMessage];
    setChat(newChat);
    setInput("");

    setTimeout(() => {
      const botReply = {
        sender: "bot",
        text: getBotResponse(text),
      };
      setChat((prev) => [...prev, botReply]);
    }, 1000);
  };

  const getBotResponse = (msg) => {
    const lower = msg.toLowerCase();
    if (lower.includes("order")) return "You can track your order from the My Orders page.";
    if (lower.includes("return")) return "We accept returns within 7 days.";
    if (lower.includes("contact")) return "You can contact support at support@fromgrove.com.";
    return "Thanks for your message. We'll get back to you shortly!";
  };

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chat));
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-700 z-50"
      >
        {isOpen ? "Close Chat" : "Live Chat 💬"}
      </button>

      {/* Chatbox */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 bg-white w-80 h-96 rounded-xl shadow-xl flex flex-col z-40">
          <div className="bg-green-600 text-white p-3 rounded-t-xl font-bold">
            From Grove Support
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {chat.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-green-100 self-end text-right ml-auto"
                    : "bg-gray-200 self-start text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="p-2 border-t flex">
            <input
              type="text"
              className="flex-1 border rounded px-2 py-1 mr-2 focus:outline-none"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            />
            <button
              onClick={() => sendMessage(input)}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveChatWidget;