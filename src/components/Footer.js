import React, { useState, useEffect, useRef } from 'react';
import './Footer.css';

const Footer = ({ onTabClick, activeTab }) => {
  const [animateTabs, setAnimateTabs] = useState(false);
  const [hasRebounced, setHasRebounced] = useState(false); // New state to track if re-bounce occurred
  const idleTimerRef = useRef(null); // Ref to store our idle timer
  const initialAnimationTimerRef = useRef(null); // Ref for initial animation delay

  const IDLE_TIME_MS = 5000; // 5 seconds (adjust as needed)

  // Function to start or reset the idle timer
  const startIdleTimer = () => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    // Only set a new timer if a re-bounce hasn't happened yet
    if (!hasRebounced) {
      idleTimerRef.current = setTimeout(() => {
        setAnimateTabs(false); // Reset animation state to re-trigger
        setTimeout(() => setAnimateTabs(true), 50); // Small delay to ensure re-trigger
        setHasRebounced(true); // Mark that the re-bounce has happened
        // No need to clear idleTimerRef.current here, as it's handled by startIdleTimer next time.
      }, IDLE_TIME_MS);
    }
  };

  // Effect for the initial bounce on component mount
  useEffect(() => {
    initialAnimationTimerRef.current = setTimeout(() => {
      setAnimateTabs(true);
      startIdleTimer(); // Start the idle timer after initial animation
    }, 100); // Small initial delay

    return () => {
      clearTimeout(initialAnimationTimerRef.current);
      clearTimeout(idleTimerRef.current); // Clear timer on unmount
    };
  }, []); // Runs once on mount

  // Modified handleTabClick to include timer reset
  const handleInternalTabClick = (tabName) => {
    onTabClick(tabName); // Call parent's handler
    if (!hasRebounced) { // Only reset timer if re-bounce hasn't happened
      startIdleTimer(); // Reset the idle timer
    }
    // No need to set animateTabs to false here; we want the animation to stop after it plays initially.
  };

  return (
    <div className="footer">
      <p>
        [u]x&nbsp;
        <span
          className={`clickable-word with-strikethrough ${animateTabs ? 'bounce-on-load' : ''} ${activeTab === 'designer' ? 'active' : ''}`}
          style={{ '--animation-delay': '0s' }}
          onClick={() => handleInternalTabClick('designer')}
        >
          designer
        </span>
        <div className="hideClickableWords">&nbsp;
        <span
          className={`clickable-word with-strikethrough ${animateTabs ? 'bounce-on-load' : ''} ${activeTab === 'engineer' ? 'active': ''}`}
          style={{ '--animation-delay': '0.2s' }}
          onClick={() => handleInternalTabClick('engineer')}
        >
          engineer
        </span>
        &nbsp;
        <span
          className={`clickable-word with-strikethrough ${animateTabs ? 'bounce-on-load' : ''} ${activeTab === 'writer' ? 'active' : ''}`}
          style={{ '--animation-delay': '0.4s' }}
          onClick={() => handleInternalTabClick('writer')}
        >
          writer
        </span></div>
        &nbsp;scientist
      </p>
    </div>
  );
};

export default Footer;
