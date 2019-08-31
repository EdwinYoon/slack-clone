import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { SigninUserForm } from '../containers/signin';
import { ternary } from '../utils';

const SignInUser = ({ match: { params } }) => {
  const [workspaceRedirection, setWorkspaceRedirection] = useState(false);

  return (
    <Fragment>
      {localStorage.getItem('teamName') !== params.teamName ? (
        <Redirect to="/signin" />
      ) : (
        ternary(
          workspaceRedirection,
          <Redirect to={`/workspace/${params.teamName}`} />,
          <SigninUserForm setWorkspaceRedirection={setWorkspaceRedirection} />,
        )
      )}
    </Fragment>
  );
};

export default SignInUser;
