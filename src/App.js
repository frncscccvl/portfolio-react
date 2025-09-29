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
    { id: 'd1', title: 'SARC-Sticker', image: designProject1Img, categories: 'app concept, ux', subtext: '[sarc-sticker]', headerImage: designProject1Header },
    { id: 'd2', title: '(blur-ATE)', image: designProject2Img, categories: 'app concept', subtext: '[blur-ATE]', headerImage: designProject2Header },
    { id: 'd3', title: 'Terminal Widgets', image: designProject3Img, categories: 'app concept, ux', subtext: '[terminal widgets]', headerImage: designProject3Header },
    { id: 'd4', title: 'CV', categories: 'cv', subtext: '[curriculum vitae]', image: designCVimg, headerImage: designCvHeader },
    /*{ id: 'd5', title: 'CV', image: designCVimg, headerImage: designCvHeader },
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
    { id: 'd18', title: 'CV', image: designCVimg, headerImage: designCvHeader },*/
    /* companies to make ux design case studies against:
        nike
        nytimes
        reddit
    */
  ],
  engineer: [
    { id: 'e1', title: 'Fliffstar', subtext: '[fliffstar]', image: engineeringProject1Img, categories: 'engineering', headerImage: engineeringProject1Header },
    { id: 'e2', title: 'Business Card', subtext: '[business card]', image: engineeringProject2Img, categories: 'engineering' },
  ],
  writer: [
    { id: 'w1', title: 'Peasantries: An Introductory', categories: 'writing', subtext: '[peasantries: an intro]', headerImage: writingProject1Header },
  ],
};

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

  const projectsToDisplay = activeTab
    ? allProjectsWithCategories.filter(project => project.category === activeTab)
    : allProjectsWithCategories;
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
                  category={project.category}
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
