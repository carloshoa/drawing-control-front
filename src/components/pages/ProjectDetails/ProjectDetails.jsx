/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';

import { Link, useParams } from 'react-router-dom';

import {
  Form, Col, Button, Accordion, Card,
} from 'react-bootstrap';

import { useAccordionButton } from 'react-bootstrap/AccordionButton';

import { useFormik } from 'formik';

import * as yup from 'yup';

import TemplatePrivate from '../../templates/TemplatePrivate/TemplatePrivate';
// Criar um toast

import { createProjectDrawing, getOneProject } from '../../../services/api';

import './ProjectDetails.css';

const ProjectDetails = () => {
  // const [show, setShow] = useState(false);
  // const [searchName, setSearchName] = useState('');
  const [project, setProject] = useState({});
  const [drawing, setDrawing] = useState({});

  const { id } = useParams();

  const getProjectById = async () => {
    try {
      const token = localStorage.getItem('token');
      const foundProject = await getOneProject(id, token);
      setProject(foundProject);
    } catch (error) {
      // setShow(true);
      console.log(error);
    }
  };

  // const handleChange = (e) => {
  //   setSearchName(e.target.value);
  // };

  // eslint-disable-next-line react/no-unstable-nested-components
  const CustomToggle = ({ children, eventKey }) => {
    const decoratedOnClick = useAccordionButton(eventKey, () => (console.log('totally custom!')));
    return (
      <button
        type="button"
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  };

  const DrawingSchema = yup.object().shape({
    drawingNumber: yup.string().required('Required Field').max(50, 'Maximum of 50 characters'),
    title: yup.string().required('Required Field').max(50, 'Maximum of 50 characters'),
    pages: yup.number().required('Required Field').min(1).max(150),
  });

  const {
    values, touched, errors, handleBlur, handleChange, handleSubmit, setErrors,
  } = useFormik({
    initialValues: {
      drawingNumber: '', title: '', pages: 1,
    },
    validationSchema: DrawingSchema,
    onSubmit: async (formData) => {
      try {
        const token = localStorage.getItem('token');
        const response = await createProjectDrawing(id, { ...formData, project: id }, token);
        setDrawing(response);
      } catch (error) {
        setErrors({
          drawingNumber: error.response.data.error,
          title: error.response.data.error,
          pages: error.response.data.error,
          revision: error.response.data.error,
        });
        console.log(error.response.data);
      }
    },
  });

  useEffect(() => {
    getProjectById();
  }, [drawing]);

  return (
    <TemplatePrivate>
      {/* <Form.Group as={Col} md="12" controlId="search-form">
        <Form.Control
          type="text"
          placeholder="search by title"
          // value={searchName}
          // onChange={handleChange}
        />
      </Form.Group> */}
      <div className="project-container">
        <h1>
          Project Detail
        </h1>
        <p>{project.title}</p>
        <div className="project-card ">
          <h2>Drawing</h2>
          <ul>
            {project.drawings && project.drawings.map((drawing) => (
                <li>{drawing.drawingNumber}</li>
                <li>{drawing.title}</li>
                <hr></hr>
              </Link>
            ))}
          </ul>

        </div>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>CRETE NEW DRAWING</Accordion.Header>
            <Accordion.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                  <Form.Label>Drawing Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="drawingNumber"
                    value={values.drawingNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.drawingNumber && !errors.drawingNumber}
                    isInvalid={touched.drawingNumber && errors.drawingNumber}
                  />
                  <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">{errors.drawingNumber}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.title && !errors.title}
                    isInvalid={touched.title && errors.title}
                  />
                  <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                  <Form.Label>Pages</Form.Label>
                  <Form.Control
                    type="number"
                    name="pages"
                    value={values.number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.number && !errors.number}
                    isInvalid={touched.number && errors.number}
                  />
                  <Form.Control.Feedback>Ok!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" className="login-submit-button mt-3"> Create New Project </Button>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

      </div>
    </TemplatePrivate>
  );
};

export default ProjectDetails;
