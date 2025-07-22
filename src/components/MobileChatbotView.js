// src/components/MobileChatbotView.js
import React from 'react';
import './MobileChatbotView.css'; // Create this CSS file next

const MobileChatbotView = () => {
  return (
    <div className="mobile-chatbot-container">
      {/* This is where your actual chatbot UI will go */}
      <h1>Chat with my Portfolio!</h1>
      <p>Ask me about my bio, skills, or projects.</p>

      {/* Placeholder for your chatbot input and output */}
      <div className="chatbot-messages">
        {/* Chat messages will be rendered here */}
        <p>User: Tell me about your bio.</p>
        <p>Bot: Hi! I'm [Your Name], a passionate [Your Roles]. I specialize in [Key Areas]...</p>
      </div>

      <div className="chatbot-input">
        <input type="text" placeholder="Type your question..." />
        <button>Send</button>
      </div>
    </div>
  );
};

export default MobileChatbotView;
