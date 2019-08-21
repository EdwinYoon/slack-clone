import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import Main from './Main';
import { Register } from '../containers/user';
import { SignInWrapper } from '../components/signIn';
import SignInWorkspace from './SignInWorkspace';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;

  background-color: #f8f8f8;
`;

const App = () => (
  <AppContainer>
    <Router>
      <SignInWrapper>
        <Route exact path="/signin" render={() => <SignInWorkspace />} />
      </SignInWrapper>
      <Route exact path="/register" render={() => <Register />} />
      <Route exact path="/" render={() => <Main />} />
    </Router>
  </AppContainer>
);

export default App;
