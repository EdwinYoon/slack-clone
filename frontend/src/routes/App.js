import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import Main from './Main';
import { Register } from '../containers/user';
import SignInWorkspace from './SignInWorkspace';
import SignInUser from './SignInUser';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;

  background-color: #f8f8f8;
`;

const App = () => {
  const [team, setTeam] = useState({ name: '', id: '' });
  return (
    <AppContainer>
      <Router>
        <Route
          exact
          path="/signin"
          render={() => <SignInWorkspace team={team} setTeam={setTeam} />}
        />
        <Route
          exact
          path="/signin/:teamId"
          render={props => <SignInUser {...props} team={team} />}
        />
        <Route exact path="/register" render={() => <Register />} />
        <Route exact path="/workspace" render={() => <Main team={team} setTeam={setTeam} />} />
        <Route exact path="/" render={() => <div>Main</div>} />
      </Router>
    </AppContainer>
  );
};

export default App;
