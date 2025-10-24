import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project, onClick, isSelected, category, onKeywordClick, activeKeywordFilter }) => {
  const handleClick = () => {
    onClick(project.id);
  };

  const keywords = project.categories.split(',').map(k => k.trim());

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
      {/*<h4>{project.categories}</h4>*/}
      <div className="card-keywords">
        {keywords.map((keyword, index) => (
          <React.Fragment key={keyword}>
            <span
              className={`keyword ${activeKeywordFilter === keyword ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onKeywordClick(keyword, project.category);
              }}
            >
              {/* 'x' icon rendering logic */}
              {activeKeywordFilter === keyword && (
                <span className="clear-filter-icon">&times;</span>
              )}

              {/* The keyword text */}
              <h4>{keyword}</h4>
            </span>

            {/* 🔑 2. Render the comma and space OUTSIDE the clickable SPAN */}
            {index < keywords.length - 1 &&
              <span className="keyword-separator">
                {','}&nbsp;
              </span>
            }
          </React.Fragment>
        ))}
      </div>

      <h5>&nbsp;</h5>

      {project.icon ? (
        <div className="icon-subtext-flex">
          <img
            src={project.icon}
            className="icon-size"
          />
          <h4>{project.subtext}</h4>
        </div>
      ) : (
        <h4>{project.subtext}</h4>
      )}
    </div>
  );
};

export default ProjectCard;
