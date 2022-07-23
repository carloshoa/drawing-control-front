/* eslint-disable arrow-body-style */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';

import * as yup from 'yup';

import { Button, Form, Col } from 'react-bootstrap';

import TemplatePublic from '../../templates/TemplatePublic/TemplatePublic';

import { login } from '../../../services/api';

import './Login.css';

const loginSchema = yup.object().shape({
  email: yup.string().required('Required Field').email('Must have email format'),
  password: yup.string().required('Required Field').max(150, 'Maximum of 150 characters'),
});

const Login = () => {
  const navigate = useNavigate();
  const {
    values, touched, errors, handleBlur, handleChange, handleSubmit, setErrors,
  } = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async (formData) => {
      try {
        const tokenResponse = await login(formData);

        localStorage.setItem('token', tokenResponse.token);

        navigate('/my-projects');
      } catch (error) {
        setErrors({
          email: error.response.data.error,
          password: error.response.data.error,
        });
        console.log(error.response.data);
      }
    },
  });

  return (
    <TemplatePublic>
      <h2 className="login-title"> GESTÃO TBT </h2>
      <p className="login-text"> Faça o seu login</p>
      <Form onSubmit={handleSubmit}>
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
        <Button type="submit" className="login-submit-button mt-3"> Login </Button>
      </Form>
    </TemplatePublic>
  );
};

export default Login;
