import React, { useState } from 'react';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import ProjectCard from './components/ProjectCard';
import ProjectDetail from './components/ProjectDetail';
import './App.css';

const allProjectsData = {
  designer: [

  ],
  engineer: [

  ],
  writer: [

  ],
};

function App() {
  return (
    <div className="App">
      <Header />

      <main className = "main-content">
        {/* Left side: Project Cards based on active tab */}
        <div className = "cards-section">

        </div>

        {/* Right side: Detailed view of the selected project */}
        <div className = "detail-section">

        </div>

      </main>

      <Footer />
    </div>
  );
}

export default App;
