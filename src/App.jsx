import React, { useState, useEffect } from 'react';

// eslint-disable-next-line import/extensions
import { getProjects, login } from './services/api.js';

import './App.css';

const App = () => {
  const [projects, setProjectss] = useState([]);

  async function fetchData() {
    const tokenresponse = await login('carlos1@arantes.com', '1231121233');
    console.log('entrou aqui ns função', tokenresponse);
    const projectsResponse = await getProjects(tokenresponse.token);
    setProjectss(projectsResponse);
  }

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    console.log('entrou aqui no useEffect');

    fetchData();
  }, []);
  console.log(projects);
  return (
    <div>
      <h1>
        Iron projects
      </h1>
      {projects.map((project, index) => (
        <p key={index}>
          {project.name}
        </p>
      ))}
    </div>
  );
};

export default App;
