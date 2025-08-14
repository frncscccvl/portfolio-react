import React, { useState, useEffect } from 'react';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import ProjectCard from './components/ProjectCard';
import ProjectDetail from './components/ProjectDetail';
import MobileChatbotView from './components/MobileChatbotView';
import './App.css';

/* Project card images*/
import designProject1Img from './assets/images/project-card-header/ucf-icon.png';
import designProject2Img from './assets/images/project-card-header/blurate-icon.png';
import designProject3Img from './assets/images/project-card-header/cli-icon.png';
import designCVimg from './assets/images/project-card-header/cv-card.png';
import engineeringProject1Img from './assets/images/project-card-header/fliffstar-card.png';
import engineeringProject2Img from './assets/images/project-card-header/android-id-project-card.png';
import writingProject1Img from './assets/images/project-card-header/peasantries-card.png';

/* Project header images */
import designProject1Header from './assets/images/designer-tab/sarc-sticker/sarc-sticker-header.png';
import designProject2Header from './assets/images/designer-tab/blurate/blurate-mockup.png';
import designProject3Header from './assets/images/designer-tab/terminal-widgets/widgets-header.svg';
import designCvHeader from './assets/images/designer-tab/cv/cv.svg';
import engineeringProject1Header from './assets/images/engineer-tab/fliffstar/fliffstar-header.png';
import writingProject1Header from './assets/images/writer-tab/peasantries/peasantries-landscape-mode.svg';

// --- Dummy Data (Placeholder) ---
// IMPORTANT: Populate this with actual project data!
const allProjectsData = {
  designer: [
    { id: 'd1', title: 'SARC-Sticker', image: designProject1Img, shortDesc: 'Helping increase pass rates for first year undergrads', headerImage: designProject1Header },
    { id: 'd2', title: '(blur-ATE)', image: designProject2Img, shortDesc: 'A brief description of design project 2.', headerImage: designProject2Header },
    { id: 'd3', title: 'Terminal Widgets', image: designProject3Img, shortDesc: 'A brief description of design project 3.', headerImage: designProject3Header },
    { id: 'd4', title: 'CV', image: designCVimg, headerImage: designCvHeader },
    { id: 'd5', title: 'CV', image: designCVimg, headerImage: designCvHeader },
    { id: 'd6', title: 'CV', image: designCVimg, headerImage: designCvHeader },
    { id: 'd7', title: 'CV', image: designCVimg, headerImage: designCvHeader },
    { id: 'd8', title: 'CV', image: designCVimg, headerImage: designCvHeader },
    { id: 'd9', title: 'CV', image: designCVimg, headerImage: designCvHeader },
    { id: 'd10', title: 'CV', image: designCVimg, headerImage: designCvHeader },
    { id: 'd11', title: 'CV', image: designCVimg, headerImage: designCvHeader },
    { id: 'd12', title: 'CV', image: designCVimg, headerImage: designCvHeader },
    { id: 'd13', title: 'CV', image: designCVimg, headerImage: designCvHeader },
    { id: 'd14', title: 'CV', image: designCVimg, headerImage: designCvHeader },
    { id: 'd15', title: 'CV', image: designCVimg, headerImage: designCvHeader },
    { id: 'd16', title: 'CV', image: designCVimg, headerImage: designCvHeader },
    { id: 'd17', title: 'CV', image: designCVimg, headerImage: designCvHeader },
    { id: 'd18', title: 'CV', image: designCVimg, headerImage: designCvHeader },
  ],
  engineer: [
    { id: 'e1', title: 'Fliffstar', image: engineeringProject1Img, shortDesc: 'A sportsbetting parlay ponderer.', headerImage: engineeringProject1Header },
    { id: 'e2', title: 'Business Card', image: engineeringProject2Img, shortDesc: 'A brief description of engineering project 2.' },
  ],
  writer: [
    { id: 'w1', title: 'Peasantries: An Introductory', image: writingProject1Img, shortDesc: 'A brief description of writing project 1.', headerImage: writingProject1Header },
  ],
};

const allProjectsArray = Object.values(allProjectsData).flat();

function App() {
  const [activeTab, setActiveTab] = useState(null); // Default to 'null'
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const projectsToDisplay = activeTab ? allProjectsData[activeTab] : allProjectsArray;
  //const projectsInActiveTab = allProjectsData[activeTab] || [];

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
    const project = projectsToDisplay.find(p => p.id === projectId);
    setSelectedProject(project);
  };

  // Set 'designer' as the default active tab after the initial render (optional)
  // This will make sure cards appear immediately on load if you want that
  /*React.useEffect(() => {
    if (activeTab === null && Object.keys(allProjectsData).length > 0) {
      setActiveTab('designer'); // Or whatever default tab you prefer
    }
  }, [activeTab]);*/

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
            {projectsToDisplay.length > 0 ? (
              projectsToDisplay.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={handleCardClick}
                  isSelected={selectedProject && selectedProject.id === project.id}
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
