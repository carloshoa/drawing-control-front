/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { Form, Col, Card } from 'react-bootstrap';

import TemplatePrivate from '../../templates/TemplatePrivate/TemplatePrivate';
// Criar um toast

import { getProjects } from '../../../services/api';

import './MyProjects.css';

const MyProjects = () => {
  // const [show, setShow] = useState(false);
  const [projects, setProjects] = useState([]);
  const [searchName, setSearchName] = useState('');

  const getProjectByTitle = async () => {
    try {
      const token = localStorage.getItem('token');
      const foundProjects = await getProjects(searchName, token);
      setProjects(foundProjects);
    } catch (error) {
      // setShow(true);
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

      <div className="project-container-1">
        {projects.map((project) => (
          <Card key={project._id} className="m-2" style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{project.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Last Revision</Card.Subtitle>
              <Card.Text>
                Drawings :
                {project.drawing}
              </Card.Text>
              <Link to={`/my-projects/${project._id}`}>
                See Drawings
              </Link>
              {/* <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link> */}
            </Card.Body>
          </Card>
        ))}
      </div>
    </TemplatePrivate>
  );
};

export default MyProjects;
