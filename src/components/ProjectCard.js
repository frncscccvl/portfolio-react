// components/ProjectCard.js
import React from 'react';
import './ProjectCard.css'; // Don't forget to import the CSS!

const ProjectCard = ({ project, onClick, isSelected }) => {
  const handleClick = () => {
    onClick(project.id);
  };

  return (
    <div
      className={`project-card ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      <img
        src={project.image}
        alt={project.title}
        className="project-card-image"
      />
      {/* Content can be directly inside the .project-card now that it's a flex container */}
      <h3>{project.title}</h3>
      <p>{project.shortDesc}</p>
    </div>
  );
};

export default ProjectCard;
