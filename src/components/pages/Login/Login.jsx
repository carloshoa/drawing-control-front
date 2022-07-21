/* eslint-disable arrow-body-style */
import React from 'react';

import { Button } from 'react-bootstrap';

import TemplatePublic from '../../templates/TemplatePublic/TemplatePublic';

import './Login.css';

const Login = () => {
  return (
    <TemplatePublic name="apenas um test">
      <h2 className="login-title"> GESTÃO TBT </h2>
      <p className="login-text"> Faça o seu login</p>
      <Button> teste </Button>
    </TemplatePublic>
  );
};

export default Login;
