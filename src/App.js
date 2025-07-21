import React, { useState } from 'react';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import ProjectCard from './components/ProjectCard';
import ProjectDetail from './components/ProjectDetail';
import './App.css';

// --- Dummy Data (Placeholder) ---
// IMPORTANT: Populate this with your actual project data!
const allProjectsData = {
  designer: [
    { id: 'd1', title: 'UX Case Study 1', image: 'https://via.placeholder.com/400x400/FF7034/FFFFFF?text=Designer+1', shortDesc: 'A brief description of design project 1.' },
    { id: 'd2', title: 'Brand Identity', image: 'https://via.placeholder.com/400x400/F28500/FFFFFF?text=Designer+2', shortDesc: 'A brief description of design project 2.' },
    { id: 'd3', title: 'Mobile UI/UX', image: 'https://via.placeholder.com/400x400/FD5602/FFFFFF?text=Designer+3', shortDesc: 'A brief description of design project 3.' },
  ],
  engineer: [
    { id: 'e1', title: 'React App', image: 'https://via.placeholder.com/400x400/FFA500/FFFFFF?text=Engineer+1', shortDesc: 'A brief description of engineering project 1.' },
    { id: 'e2', title: 'Node.js API', image: 'https://via.placeholder.com/400x400/FF8C00/FFFFFF?text=Engineer+2', shortDesc: 'A brief description of engineering project 2.' },
  ],
  writer: [
    { id: 'w1', title: 'Technical Doc', image: 'https://via.placeholder.com/400x400/FF7034/FFFFFF?text=Writer+1', shortDesc: 'A brief description of writing project 1.' },
  ],
};

function App() {
  const [activeTab, setActiveTab] = useState(null); // Default to 'null'
  const [selectedProject, setSelectedProject] = useState(null);

  const projectsInActiveTab = allProjectsData[activeTab] || [];

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setSelectedProject(null); // Clear selected project when changing tabs
  };

  const handleCardClick = (projectId) => {
    const project = projectsInActiveTab.find(p => p.id === projectId);
    setSelectedProject(project);
  };

  // Set 'designer' as the default active tab after the initial render (optional)
  // This will make sure cards appear immediately on load if you want that
  /*React.useEffect(() => {
    if (activeTab === null && Object.keys(allProjectsData).length > 0) {
      setActiveTab('designer'); // Or whatever default tab you prefer
    }
  }, [activeTab]);*/

  return (
    <div className="app-container">
      <Header />

      <main className="main-content desktop-only">
        {/* Left side: Project Cards based on active tab */}
        <div className="cards-section">
          {activeTab === null ? (
            <p className="placeholder-text"></p>
          ) : projectsInActiveTab.length > 0 ? (
            projectsInActiveTab.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={handleCardClick}
                isSelected={selectedProject && selectedProject.id === project.id}
              />
            ))
          ) : (
            <p className="no-projects-message">No projects found for this category yet.</p>
          )}
        </div>

        {/* Right side: Detailed view of the selected project */}
        <div className={`detail-section ${selectedProject ? 'detail-active' : ''}`}>
          {selectedProject ? (
            <ProjectDetail project={selectedProject} />
          ) : (
            <div className="placeholder-detail">
              <p></p>
            </div>
          )}
        </div>
      </main>

      <Footer onTabClick={handleTabClick} activeTab={activeTab} />
    </div>
  );
}

export default App;
