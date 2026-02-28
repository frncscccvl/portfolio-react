import React, { useState } from 'react';
import './ProjectDetail.css';

const ProjectDetail = ({ project }) => {
  const [status, setStatus] = useState('idle');

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

  // 🔑 Submit handler scoped correctly to the component
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    // Grab the form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      // Replace this URL with your actual deployed Firebase Function URL later
      const response = await fetch('https://send-email-yxvqzxoq5a-uc.a.run.app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setStatus('success');
        e.target.reset(); // Clear the form
      } else {
        throw new Error('Backend failed');
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
      setStatus('idle');
    }
  };

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
                <h3>Thesis / Goal</h3>
                <p>{project.thesis || 'Not specified yet.'}</p>
              </section>
            )}

            {project.tabImage && (
              <section>
                <div className="project-hook">
                  <img
                    src={project.tabImage}
                    alt={project.title}
                    className="project-tab-image"
                  />
                  <p dangerouslySetInnerHTML={{ __html: project.hook }} />
                </div>
              </section>
            )}

            {project.heroImage && (
              <section>
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="hero-image"
                />
              </section>
            )}

            {project.empathyStage && (
              <div>
                <h3>Methodology and Goal</h3>
                <section>
                  <p dangerouslySetInnerHTML={{ __html: project.empathyStage }} />
                </section>
              </div>
            )}

            {project.defineStage && project.personaImage && (
              <div>
                <h3>Persona Generation</h3>
                <section>
                  <img
                    src={project.personaImage}
                    alt={project.title}
                    className="persona-image"
                  />
                  <p dangerouslySetInnerHTML={{ __html: project.defineStage }} />
                </section>
              </div>
            )}

            {project.imageOptionFloatLeft && project.imageOptionFloatRight && (
              <div>
                <h3>{project.imagesDescTitle}</h3>
                <p dangerouslySetInnerHTML={{ __html: project.imagesDescContentsA }} />
                <section>
                  <img
                    src={project.imageOptionFloatLeft}
                    alt={project.title}
                    className="project-image-option-left"
                  />
                  <img
                    src={project.imageOptionFloatRight}
                    alt={project.title}
                    className="project-image-option-left"
                  />
                </section>
                <p dangerouslySetInnerHTML={{ __html: project.imagesDescContentsB }} />
              </div>
            )}

            {project.imageOptionOne && (
              <div>
              <h3>{project.paragraphOneTitle}</h3>
                <p dangerouslySetInnerHTML={{ __html: project.paragraphOptionOne }} />
                <section>
                  <img
                    src={project.imageOptionOne}
                    alt={project.title}
                    className="project-image-option-list"
                  />
                  <ol>
                    <li>{project.listA}</li>
                    <li>{project.listB}</li>
                    <li>{project.listC}</li>
                    <li>{project.listD}</li>
                    <li>{project.listE}</li>
                    <li>{project.listF}</li>
                  </ol>
                  <p dangerouslySetInnerHTML={{ __html: project.paragraphOptionTwo }} />
                </section>
              </div>
            )}

            {project.hifiMockupA && (
              <div>
              <h3>HiFi Visuals</h3>
                <p dangerouslySetInnerHTML={{ __html: project.hifiMockupDescA }} />
                <section className="hifi-visuals-section">
                  <img
                    src={project.hifiMockupA}
                    alt={project.title}
                    className="project-image-option-left"
                  />
                  <img
                    src={project.hifiMockupB}
                    alt={project.title}
                    className="project-image-option-right"
                  />
                  <p dangerouslySetInnerHTML={{ __html: project.hifiMockupDescB }} />
                </section>
                <img
                  src={project.flowChart}
                  alt={project.title}
                  className="hero-image"
                />
              </div>
            )}

            {project.paragraphOneContents && !project.empathyStage && (
              <section>
                <h3>{project.paragraphOneTitle || 'Paragraph 1'}</h3>
                <p dangerouslySetInnerHTML={{ __html: project.paragraphOneContents }} />
              </section>
            )}

            {project.imageTwo && (
              <section>
                <img
                  src={project.imageTwo}
                  alt={project.title} 
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
                  alt={project.title}
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
                  alt={project.title}
                  className="project-detail-image"
                />
              </section>
            )}

            {project.privacyPolicy && (
              <section>
                {project.privacyPolicy}
              </section>
            )}

            {project.tos && (
              <section>
                {project.tos}
              </section>
            )}
          </>
        );

      case 'writer':
        return (
          // --- WRITING TEMPLATE ---
          <>
            {project.promptTitle && (
              <section>
                <h3>{project.promptTitle}</h3>
                <p>{project.prompt}</p>
                <p>{project.snapshot}</p>
              </section>
            )}

            {project.uxWritingRationale && (
              <section>
                <h3>🧠 UX Writing/Content Strategy Rationale</h3>
                <p dangerouslySetInnerHTML={{ __html: project.uxWritingRationale }} />
              </section>
            )}

            {project.thesis && (
              <section>
                <h3>{project.snapshotTitle}</h3>
                <p dangerouslySetInnerHTML={{ __html: project.thesis }} />
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
                  alt={project.title} 
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

      case 'scientist':
        // CV display cleared out for future refactoring
        return null;

      case 'contact':
        return (
          <section className="email-compose-section">
            {status === 'success' ? (
              <div className="success-message">
                <h3>Message Sent!</h3>
                <p>I've received your message and will get back to you soon.</p>
                <button onClick={() => setStatus('idle')} className="email-submit-btn">
                  Send another
                </button>
              </div>
            ) : (
              <>
                <h3 className="form-heading">Composing email to hello@frncscccvl.com</h3>
                <form className="email-form" onSubmit={handleEmailSubmit}>
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Your Name"
                    required
                    disabled={status === 'sending'}
                    className="email-input"
                  />
                  <input
                    type="email"
                    name="user_email"
                    placeholder="Your Email"
                    required
                    disabled={status === 'sending'}
                    className="email-input"
                  />
                  <textarea
                    name="message"
                    placeholder="Inquiry..."
                    required
                    disabled={status === 'sending'}
                    className="email-textarea"
                  />
                  <button
                    type="submit"
                    className="email-submit-btn"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="project-detail">
      <p className="project-detail-title">{title}</p>
      <div className="project-detail-content">
        {renderTemplate(project.category)}
      </div>
    </div>
  );
};

export default ProjectDetail;
