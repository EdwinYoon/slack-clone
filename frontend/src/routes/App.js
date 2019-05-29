import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import Main from './Main';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
`;

const App = () => (
  <AppContainer>
    <Router>
      <Route path="/" render={() => <Main />} />
    </Router>
  </AppContainer>
);

export default App;
