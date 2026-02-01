import React, { useState, useEffect, useRef } from 'react';
import './Footer.css';

const Footer = ({ onTabClick, activeTab }) => {
  const [animateTabs, setAnimateTabs] = useState(false);
  const [hasRebounced, setHasRebounced] = useState(false);
  const idleTimerRef = useRef(null);
  const initialAnimationTimerRef = useRef(null);

  const IDLE_TIME_MS = 5000;

  const startIdleTimer = () => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    if (!hasRebounced) {
      idleTimerRef.current = setTimeout(() => {
        setAnimateTabs(false);
        setTimeout(() => setAnimateTabs(true), 50);
        setHasRebounced(true);
      }, IDLE_TIME_MS);
    }
  };

  useEffect(() => {
    initialAnimationTimerRef.current = setTimeout(() => {
      setAnimateTabs(true);
      startIdleTimer();
    }, 100);

    return () => {
      clearTimeout(initialAnimationTimerRef.current);
      clearTimeout(idleTimerRef.current);
    };
  }, []);

  const handleInternalTabClick = (tabName) => {
    onTabClick(tabName); // Triggers state change in App.js
    if (!hasRebounced) {
      startIdleTimer();
    }
  };

  return (
    <div className="footer">
      <p>
        {/* 1. Static Prefix */}
        <span className="ux-prefix">[u]x</span>

        {/* 2. Designer - Always visible */}
        <span
          className={`clickable-word word-designer with-strikethrough ${animateTabs ? 'bounce-on-load' : ''} ${activeTab === 'designer' ? 'active' : ''}`}
          style={{ '--animation-delay': '0s' }}
          onClick={() => handleInternalTabClick('designer')}
        >
          designer
        </span>

        {/* 3. Engineer - Individual Child */}
        <span
          className={`clickable-word word-engineer with-strikethrough ${animateTabs ? 'bounce-on-load' : ''} ${activeTab === 'engineer' ? 'active': ''}`}
          style={{ '--animation-delay': '0.2s' }}
          onClick={() => handleInternalTabClick('engineer')}
        >
          engineer
        </span>

        {/* 4. Writer - Individual Child */}
        <span
          className={`clickable-word word-writer with-strikethrough ${animateTabs ? 'bounce-on-load' : ''} ${activeTab === 'writer' ? 'active' : ''}`}
          style={{ '--animation-delay': '0.4s' }}
          onClick={() => handleInternalTabClick('writer')}
        >
          writer
        </span>

        {/* 5. Scientist - Always visible */}
        <span
          className={`clickable-word scientist-word ${activeTab === null ? 'active' : ''}`}
          onClick={() => handleInternalTabClick(null)}
        >
          scientist
        </span>
      </p>
    </div>
  );
};

export default Footer;
