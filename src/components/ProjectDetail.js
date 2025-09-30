import React from 'react';
import './ProjectDetail.css';

const ProjectDetail = ({ project }) => {
  // Defensive check: If no project is passed (e.g., initially null), render nothing or a placeholder
  if (!project) {
    return (
      <div className="project-detail-empty">
        <p>No project selected. Click a card to view details.</p>
      </div>
    );
  }

  // Destructure project properties for easier access
  const { title, category, headerImage, longDesc } = project;

  const renderTemplate = (category) => {
    switch (category) {
      case 'designer':
        return (
          //--- DESIGN TEMPLATE ---
          <>

          </>
        );

      case 'engineer':
        return (
          // --- ENGINEERING TEMPLATE ---
          <>


          </>
        );

      case 'writer':
        return (
          // --- WRITING TEMPLATE ---
          <>
            {project.prompt && (
              <section>
                <h3>Prompt</h3>
                <p>{project.prompt}</p>
              </section>
            )}

            {project.thesis && (
              <section>
                <h3>Thesis / Goal</h3>
                <p>{project.thesis || 'Not specified yet.'}</p>
              </section>
            )}

            {project.image && (
              <section>
                <img
                  src={project.image}
                  alt={project.title} // Always include alt text for accessibility!
                  className="project-detail-image"
                />
              </section>
            )}

            {project.paragraphOneContents && (
              <section>
                <h3>{project.paragraphOneTitle}</h3>
                <p>{project.paragraphOneContents}</p>
              </section>
            )}

            {project.paragraphTwoContents && (
              <section>
                <h3>{project.paragraphTwoTitle || 'Paragraph 2'}</h3>
                <p>{project.paragraphTwoContents}</p>
              </section>
            )}

            {project.paragraphThreeContents && (
              <section>
                <h3>{project.paragraphThreeTitle || 'Paragraph 3'}</h3>
                <p>{project.paragraphThreeContents}</p>
              </section>
            )}

            {project.paragraphFourContents && (
                <section>
                    <h3>{project.paragraphFourTitle || 'Paragraph 4'}</h3>
                    <p>{project.paragraphFourContents}</p>
                </section>
            )}

            {project.paragraphFiveContents && (
                <section>
                    <h3>{project.paragraphFiveTitle || 'Paragraph 5'}</h3>
                    <p>{project.paragraphFiveContents}</p>
                </section>
            )}

            <h1></h1>
          </>
        );
    }
  };

  return (
    <div className="project-detail">
      <p className="project-detail-title">{title}</p>
      <p className="project-detail-description">{longDesc}</p>

      {headerImage && (
        <div className="project-detail-header-image-container">
          <img src={headerImage} alt={`${title} header`} className="project-detail-header-image" />
        </div>
      )}

      <div className="project-detail-content">
        {renderTemplate(project.category)}
      </div>
    </div>
  );
};

export default ProjectDetail;
