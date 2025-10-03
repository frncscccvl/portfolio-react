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
            {project.prompt && (
              <section>
                <h3>Prompt</h3>
                <p>{project.prompt}</p>
              </section>
            )}

            {project.thesis && (
              <section>
                <h3>Thesis</h3>
                <p>{project.thesis}</p>
              </section>
            )}

            {project.image && (
              <section>
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-detail-image"
                />
              </section>
            )}

            {project.paragraphOneContents && (
              <section>
                <h3>{project.paragraphOneTitle || 'Paragraph 1'}</h3>
                <p dangerouslySetInnerHTML={{ __html: project.paragraphOneContents }} />
              </section>
            )}

            {project.imageTwo && (
              <section>
                <img
                  src={project.imageTwo}
                  alt={project.title} // Always include alt text for accessibility!
                  className="project-detail-image"
                />
              </section>
            )}

            {project.paragraphTwoContents && (
              <section>
                <h3>{project.paragraphTwoTitle || 'Paragraph 2'}</h3>
                <p dangerouslySetInnerHTML={{ __html: project.paragraphTwoContents }} />
              </section>
            )}

            {project.paragraphThreeContents && (
              <section>
                <h3>{project.paragraphThreeTitle || 'Paragraph 3'}</h3>
                <p dangerouslySetInnerHTML={{ __html: project.paragraphThreeContents }} />
              </section>
            )}

            {project.imageFour && (
              <section>
                <img
                  src={project.imageFour}
                  alt={project.title} // Always include alt text for accessibility!
                  className="project-detail-image"
                />
              </section>
            )}

            <h1></h1>
          </>
        );

      case 'engineer':
        return (
          // --- ENGINEERING TEMPLATE ---
          <>
            {project.image && (
              <section>
                <img
                  src={project.image}
                  alt={project.title} // Always include alt text for accessibility!
                  className="project-detail-image"
                />
              </section>
            )}

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

            {project.preface && (
              <section>
                <h3>Preface</h3>
                <p>{project.preface || 'Not specified yet.'}</p>
              </section>
            )}

            {project.contents && (
              <section>
                <h3>Contents</h3>
                <p dangerouslySetInnerHTML={{ __html: project.contents }} />
              </section>
            )}

            {project.sideboard && (
              <section>
                <h3>Sideboard</h3>
                <p dangerouslySetInnerHTML={{ __html: project.sideboard }} />
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
                <p dangerouslySetInnerHTML={{ __html: project.paragraphOneContents }} />
              </section>
            )}

            {project.paragraphTwoContents && (
              <section>
                <h3>{project.paragraphTwoTitle || 'Paragraph 2'}</h3>
                <p dangerouslySetInnerHTML={{ __html: project.paragraphTwoContents }} />
              </section>
            )}

            {project.paragraphThreeContents && (
              <section>
                <h3>{project.paragraphThreeTitle || 'Paragraph 3'}</h3>
                <p dangerouslySetInnerHTML={{ __html: project.paragraphThreeContents }} />
              </section>
            )}

            {project.paragraphFourContents && (
                <section>
                    <h3>{project.paragraphFourTitle || 'Paragraph 4'}</h3>
                    <p dangerouslySetInnerHTML={{ __html: project.paragraphFourContents }} />
                </section>
            )}

            {project.paragraphFiveContents && (
                <section>
                    <h3>{project.paragraphFiveTitle || 'Paragraph 5'}</h3>
                    <p dangerouslySetInnerHTML={{ __html: project.paragraphFiveContents }} />
                </section>
            )}

            {project.paragraphSixContents && (
                <section>
                    <h3>{project.paragraphSixTitle || 'Paragraph 6'}</h3>
                    <p dangerouslySetInnerHTML={{ __html: project.paragraphSixContents }} />
                </section>
            )}

            {project.paragraphSevenContents && (
                <section>
                    <h3>{project.paragraphSevenTitle || 'Paragraph 7'}</h3>
                    <p dangerouslySetInnerHTML={{ __html: project.paragraphSevenContents }} />
                </section>
            )}

            {project.paragraphEightContents && (
                <section>
                    <h3>{project.paragraphEightTitle || 'Paragraph 8'}</h3>
                    <p dangerouslySetInnerHTML={{ __html: project.paragraphEightContents }} />
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
      {/*<p className="project-detail-description">{longDesc}</p>*/}

      <div className="project-detail-content">
        {renderTemplate(project.category)}
      </div>
    </div>
  );
};

export default ProjectDetail;
