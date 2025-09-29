import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project, onClick, isSelected, category }) => {
  const handleClick = () => {
    onClick(project.id);
  };

  return (
    <div
      className={`project-card ${category} ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      {/*<img
        src={project.image}
        className="project-card-image"
      />*/}
      {/* Content can be directly inside the .project-card now that it's a flex container */}
      <h4>{project.categories}</h4>
      <h5>&nbsp;</h5>
      <h4>{project.subtext}</h4>
    </div>
  );
};

export default ProjectCard;
