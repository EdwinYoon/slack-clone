import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import Main from './Main';
import { Register } from '../containers/user';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
`;

const App = () => (
  <AppContainer>
    <Router>
      <Route exact path="/register" render={() => <Register />} />
      <Route exact path="/" render={() => <Main />} />
    </Router>
  </AppContainer>
);

export default App;
