/* eslint-disable arrow-body-style */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';

import * as yup from 'yup';

import { Button, Form, Col } from 'react-bootstrap';

import TemplatePublic from '../../templates/TemplatePublic/TemplatePublic';

import { login, register } from '../../../services/api';

import './Register.css';

const registerSchema = yup.object().shape({
  name: yup.string().required('Required Field').max(150, 'Maximum of 150 characters'),
  email: yup.string().required('Required Field').email('Must have email format'),
  password: yup.string().required('Required Field').max(150, 'Maximum of 150 characters'),
});

const Register = () => {
  const navigate = useNavigate();

  const {
    values, touched, errors, handleBlur, handleChange, handleSubmit, setErrors,
  } = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: registerSchema,
    onSubmit: async (formData) => {
      try {
        await register(formData);

        const tokenResponse = await login({ email: formData.email, password: formData.password });

        localStorage.setItem('token', tokenResponse.token);

        navigate('/my-projects');
      } catch (error) {
        const errorFormat = typeof (error.response.data.error);
        if (errorFormat === 'object') {
          error.response.data.error.map((err) => {
            if (err.field === 'password') {
              setErrors({
                password: err.errors,
              });
            } else if (err.field === 'email') {
              setErrors({
                email: err.errors,
              });
            }
          });
        } else if (errorFormat === 'string') {
          setErrors({
            email: error.response.data.error,
          });
        }
      }
    },
  });

  return (
    <TemplatePublic>
      <h2 className="login-title"> GESTÃO TBT </h2>

      <p className="login-text"> Faça o seu login</p>

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            isValid={touched.name && !errors.name}
            isInvalid={touched.name && errors.name}
          />
          <Form.Control.Feedback>Ok!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            isValid={touched.email && !errors.email}
            isInvalid={touched.email && errors.email}
          />
          <Form.Control.Feedback>Ok!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            isValid={touched.password && !errors.password}
            isInvalid={touched.password && errors.password}
          />
          <Form.Control.Feedback>Ok!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" className="login-submit-button mt-3"> Register </Button>
      </Form>
    </TemplatePublic>
  );
};

export default Register;
