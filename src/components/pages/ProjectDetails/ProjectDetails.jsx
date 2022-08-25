/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';

import { Link, useParams } from 'react-router-dom';

import {
  Form, Col, Button, Modal, Table,
} from 'react-bootstrap';

import { useFormik } from 'formik';

import * as yup from 'yup';

import TemplatePrivate from '../../templates/TemplatePrivate/TemplatePrivate';

import {
  createProjectDrawing, getOneProject, deleteDrawing, updateDrawing,
} from '../../../services/api';

import './ProjectDetails.css';

const ProjectDetails = () => {
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
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

  const handleShow = () => setShow(true);
  const handleShowUpdate = () => {
    setShowUpdate(true);
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    setShowUpdate(false);
  };

  const DrawingSchema = yup.object().shape({
    drawingNumber: yup.string().required('Required Field').max(50, 'Maximum of 50 characters'),
    title: yup.string().required('Required Field').max(50, 'Maximum of 50 characters'),
    pages: yup.number().required('Required Field').min(1).max(150),
  });

  const {
    values, touched, errors, handleBlur, handleChange,
    handleSubmit, setErrors, setValues, setTouched,
  } = useFormik({
    initialValues: {
      drawingNumber: '', title: '', pages: 1,
    },
    validationSchema: DrawingSchema,
    onSubmit: async (formData) => {
      // console.log(handleSubmit);
      try {
        const token = localStorage.getItem('token');
        const response = await createProjectDrawing(id, { ...formData, project: id }, token);
        setDrawing(response);
        setValues({
          drawingNumber: '',
          title: '',
          pages: 1,
        });
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

  const handleDelete = async (deletedId) => {
    const token = localStorage.getItem('token');
    await deleteDrawing({ id: deletedId }, token);
    const foundProject = await getOneProject(id, token);
    setProject(foundProject);
  };

  const saveDrawing = async (updatedDrawing) => {
    const token = localStorage.getItem('token');
    try {
      await updateDrawing(updatedDrawing, token);
      const foundProject = await getOneProject(id, token);
      setProject(foundProject);
      setShowUpdate(false);
      setShow(false);
    } catch (error) {
      setErrors({
        drawingNumber: error.response.data.error,
        title: error.response.data.error,
        pages: error.response.data.error,
        revision: error.response.data.error,
      });
      console.log(error.response.data);
    }
  };

  const handleUpdate = async (updatedDrawing) => {
    setShow(true);
    setShowUpdate(true);
    setValues(updatedDrawing);

    setTouched({
      drawingNumber: false,
      title: false,
      pages: false,
    });
    console.log(updatedDrawing);
    // await saveDrawing(values);
  };

  const handleClick = (updatedValues) => {
    console.log('oque vem', updatedValues);
    // console.log(handleSubmit);
    // console.log(handleUpdate);
    // eslint-disable-next-line no-unused-expressions
    (showUpdate ? saveDrawing(updatedValues) : handleSubmit());
  };

  useEffect(() => {
    getProjectById();
    handleClose();
  }, [drawing]);

  return (
    <TemplatePrivate>
      <div className="project-container">
        <h1>Project Detail</h1>
        <p>{project.title}</p>
        <h2>Drawings</h2>

        <Button variant="primary" className="mb-4 w-25" onClick={handleShow}>
          New Drawing
        </Button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Drawing Name</th>
              <th>Title</th>
              <th>Revision</th>
              <th>Pages</th>
              <th>  </th>
            </tr>
          </thead>
          <tbody>
            {project.drawings && project.drawings.map((eachDrawing, index) => (
              <tr key={eachDrawing.drawingNumber}>
                <td>{index}</td>
                <td>
                  <Link to="/">
                    {eachDrawing.drawingNumber}
                  </Link>
                </td>
                <td>{eachDrawing.title}</td>
                <td>{eachDrawing.revision}</td>
                <td>{eachDrawing.pages}</td>
                <td>
                  <Button variant="success" onClick={() => handleUpdate(eachDrawing)} className="me-2">Edit</Button>
                  <Button onClick={() => handleDelete(eachDrawing._id)} variant="danger">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleClick}>
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
                value={values.pages}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.pages && !errors.pages}
                isInvalid={touched.pages && errors.pages}
              />
              <Form.Control.Feedback>Ok!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleClick(values)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </TemplatePrivate>
  );
};

export default ProjectDetails;
