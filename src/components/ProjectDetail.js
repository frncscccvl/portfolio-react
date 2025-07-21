// src/components/ProjectDetail.js
import React from 'react';
import './ProjectDetail.css'; // We'll create this CSS file next

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
  const { title, longDesc, technologies, liveLink, githubLink } = project;

  return (
    <div className="project-detail">
      <h2 className="project-detail-title">{title}</h2>
      <p className="project-detail-description">{longDesc}</p>

      {technologies && technologies.length > 0 && (
        <div className="project-detail-section">
          <h3 className="project-detail-section-title">Technologies Used:</h3>
          <ul className="project-detail-tech-list">
            {technologies.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </div>
      )}

      {(liveLink || githubLink) && (
        <div className="project-detail-links project-detail-section">
          <h3 className="project-detail-section-title">Links:</h3>
          {liveLink && (
            <a href={liveLink} target="_blank" rel="noopener noreferrer" className="project-detail-link">
              View Live Project
              <span className="icon-external-link">↗</span> {/* Optional external link icon */}
            </a>
          )}
          {githubLink && (
            <a href={githubLink} target="_blank" rel="noopener noreferrer" className="project-detail-link">
              GitHub Repository
              <span className="icon-github"></span> {/* Optional GitHub icon */}
            </a>
          )}
        </div>
      )}

      {/* Add more sections here as needed, e.g., screenshots, video links, your role, challenges, solutions */}
    </div>
  );
};

export default ProjectDetail;
