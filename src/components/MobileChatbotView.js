// src/components/MobileChatbotView.js
import React, { useState, useRef, useEffect } from 'react'; // Import useRef and useEffect
import './MobileChatbotView.css';

const MobileChatbotView = () => {
  // State to store chat messages: [{ sender: 'user' | 'bot', text: 'message content' }]
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi there! I'm your portfolio chatbot. Ask me about FRANCIS' bio, skills, or projects!" }
  ]);
  // State for the current message being typed by the user
  const [inputMessage, setInputMessage] = useState('');
  // Ref to automatically scroll to the latest message
  const messagesEndRef = useRef(null);

  // --- Define your chatbot's "knowledge base" here ---
  // You can move this to a separate file (e.g., data/chatbotResponses.js) later
  const chatbotKnowledge = {
    bio: "Hi! I'm [Your Name], a passionate UX designer, software engineer, and writer. I love crafting intuitive experiences, solving complex technical challenges, and communicating ideas effectively. I believe in blending creativity with systematic problem-solving.",
    skills: "I have a strong foundation in [list key technical skills, e.g., React, Node.js, Python, SQL], UI/UX design principles, user research, content strategy, and technical writing. I'm always learning new technologies!",
    projects: "You can see some of my work by clicking on the categories in the footer on desktop. On mobile, I'm working on a way to share project highlights here soon!", // Or direct them back to desktop
    greeting: "Hello! How can I help you today?",
    default: "I'm sorry, I don't understand that question yet. Please try asking about my bio, skills, or projects.",
  };

  // Function to scroll to the bottom of the messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Effect to scroll to bottom whenever messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to handle sending a message
  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return; // Don't send empty messages

    const userMessage = { sender: 'user', text: inputMessage.trim() };
    // Add user's message to the chat
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage.trim().toLowerCase());
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: botResponse }]);
    }, 500); // 0.5 second delay for bot response

    setInputMessage(''); // Clear input field
  };

  // Function to generate bot's response based on user input
  const generateBotResponse = (query) => {
    if (query.includes('bio') || query.includes('about me')) {
      return chatbotKnowledge.bio;
    }
    if (query.includes('skill') || query.includes('tech') || query.includes('technology')) {
      return chatbotKnowledge.skills;
    }
    if (query.includes('project') || query.includes('work') || query.includes('portfolio')) {
      return chatbotKnowledge.projects;
    }
    if (query.includes('hi') || query.includes('hello') || query.includes('hey')) {
        return chatbotKnowledge.greeting;
    }
    return chatbotKnowledge.default;
  };

  // Handle Enter key press in the input field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="mobile-chatbot-container">
      {/* Chat Messages Display */}
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message-bubble ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {/* Empty div for scrolling to bottom */}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Area */}
      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Type your question..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress} // Listen for Enter key
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default MobileChatbotView;
