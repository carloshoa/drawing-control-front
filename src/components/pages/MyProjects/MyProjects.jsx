/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { Form, Col } from 'react-bootstrap';

import TemplatePrivate from '../../templates/TemplatePrivate/TemplatePrivate';
// Criar um toast

import { getProjects } from '../../../services/api';

import './MyProjects.css';

const MyProjects = () => {
  const [show, setShow] = useState(false);
  const [projects, setProjects] = useState([]);
  const [searchName, setSearchName] = useState('');

  const getProjectByTitle = async () => {
    try {
      const token = localStorage.getItem('token');
      const foundProjects = await getProjects(searchName, token);
      setProjects(foundProjects);
    } catch (error) {
      setShow(true);
    }
  };

  const handleChange = (e) => {
    setSearchName(e.target.value);
  };

  useEffect(() => {
    getProjectByTitle();
  }, [searchName]);

  return (
    <TemplatePrivate>
      <Form.Group as={Col} md="12" controlId="search-form">
        <Form.Control
          type="text"
          placeholder="search by title"
          value={searchName}
          onChange={handleChange}
        />
      </Form.Group>

      <div className="project-container">
        {projects.map((project) => (
          <Link className="project-card" key={project._id} to={`/my-projects/${project._id}`}>
            <p>{project.name}</p>
          </Link>
        ))}
      </div>
    </TemplatePrivate>
  );
};

export default MyProjects;
