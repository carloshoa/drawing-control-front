import React from 'react';

import PropTypes from 'prop-types';

import './TemplatePublic.css';

const TemplatePublic = ({ children, name }) => (
  <div className="template-public-container">
    <div className="template-public-background" />
    <div className="template-public-content">
      {children}
      {name}
    </div>
  </div>
);

TemplatePublic.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
};

TemplatePublic.defaultProps = {
  name: 'Default',
};

export default TemplatePublic;
