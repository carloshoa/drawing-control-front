import React from 'react';

import PropTypes from 'prop-types';

import './TemplatePrivate.css';

const TemplatePrivate = ({ children }) => (
  <div>
    <nav className="template-private-navbar">
      <div>
        <a
          href="my-projects"
          className="template-private-iron-project-logo"
        >
          TBT ENGENHARIA
        </a>
      </div>
      <div className="tamplate-private-nav-links">
        <a href="/my-projects">My Projects</a>
        <a href="/my-projects/new">Create New Project</a>
        <a href="/logout">Logout</a>
      </div>
    </nav>
    <div className="template-private-content">
      {children}
    </div>
  </div>

);

TemplatePrivate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TemplatePrivate;
