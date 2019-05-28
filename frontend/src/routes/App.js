import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const App = () => (
  <AppContainer>
    <Router>
      <Route path="/" render={() => <div>Hello, Main</div>} />
    </Router>
  </AppContainer>
);

export default App;
