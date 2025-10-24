import React, { useState, useEffect } from 'react';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import ProjectCard from './components/ProjectCard';
import ProjectDetail from './components/ProjectDetail';
import MobileChatbotView from './components/MobileChatbotView';
import './App.css';

import { allProjectsData } from './utils/ProjectData.js';

/**
 * Shuffles an array in-place using the Fisher-Yates algorithm.
 * @param {Array} array The array to shuffle.
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const allProjectsWithCategories = Object.keys(allProjectsData).flatMap(category =>
  allProjectsData[category].map(project => ({ ...project, category }))
);

shuffleArray(allProjectsWithCategories);

function App() {
  const [activeTab, setActiveTab] = useState(null); // Default to 'null'
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeKeywordFilter, setActiveKeywordFilter] = useState(null);

  // 1. Determine the base set of projects (All projects or just the active tab's projects)
  const baseProjects = activeTab
    ? allProjectsWithCategories.filter(project => project.category === activeTab)
    : allProjectsWithCategories;

  // 2. Apply the keyword filter to the base set
  const projectsToRender = activeKeywordFilter
    ? baseProjects.filter(project =>
        // 🔑 Project.categories must be a string for .includes()
        project.categories && project.categories.includes(activeKeywordFilter)
      )
    : baseProjects; // If no keyword filter, use the base set

  const handleKeywordClick = (keyword, category) => {
  // 1. Check if the keyword is already the active filter AND the tab is correct.
  //    If so, clicking it again de-selects the filter and resets the activeTab to the category.
    if (activeKeywordFilter === keyword && activeTab === category) {
      setActiveKeywordFilter(null);
      setActiveTab(null);
      setSelectedProject(null); // Clear selected project
    } else {
      // 2. If it's a new keyword or a new tab, set both states:
      setActiveKeywordFilter(keyword);
      // 🔑 Set the activeTab to the project's main category
      setActiveTab(category);
      // 🔑 Crucial: Clear any selected detail view
      setSelectedProject(null);
    }
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setSelectedProject(null); // Clear selected project when changing tabs
  };

  /* Code to handle projects hidden on landing page. (Option A) */
  /*const handleCardClick = (projectId) => {
    const project = projectsInActiveTab.find(p => p.id === projectId);
    setSelectedProject(project);
  };*/

  /* Code to handle all projects visible on landing page. (Option B) */
  const handleCardClick = (projectId) => {
    const project = projectsToRender.find(p => p.id === projectId);
    setSelectedProject(project);
  };

  // Effect to determine if it's a mobile screen based on width
  useEffect(() => {
    const checkMobile = () => {
      // This breakpoint should match your @media (max-width: 1023px) in App.css
      setIsMobile(window.innerWidth <= 1023);
    };

    checkMobile(); // Check on initial mount
    window.addEventListener('resize', checkMobile); // Add resize listener

    return () => window.removeEventListener('resize', checkMobile); // Cleanup
  }, []);

  return (
    <div className={`app-container ${selectedProject ? 'project-detail-active' : ''}`}>
      <Header />

      {isMobile ? (
        <MobileChatbotView />
      ) : (
        <main className="main-content desktop-only">
          {/* Left side: Project Cards based on active tab */}
          <div className="cards-section">
            {/* Option A: Let project be hidden on landing page. */}
            {/*{activeTab === null ? (
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
            )}*/}
            {/* Option B: Show all projects on landing page. */}
            {projectsToRender.length > 0 ? (
              projectsToRender.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={handleCardClick}
                  isSelected={selectedProject && selectedProject.id === project.id}
                  category={project.category}
                  onKeywordClick={handleKeywordClick}
                  activeKeywordFilter={activeKeywordFilter}
                />
              ))
            ) : (
              <p className="no-projects-message">No projects found.</p>
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
      )}

      <Footer onTabClick={handleTabClick} activeTab={activeTab} isMobile={isMobile} />
    </div>
  );
}

export default App;
