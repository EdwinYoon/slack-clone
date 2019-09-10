import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { SigninUserForm } from '../containers/signin';
import { ternary } from '../utils';

const SignInUser = ({ match }) => {
  const [workspaceRedirection, setWorkspaceRedirection] = useState(false);
  const { teamName } = match.params;

  return (
    <Fragment>
      {localStorage.getItem('teamName') !== teamName ? (
        <Redirect to="/signin" />
      ) : (
        ternary(
          workspaceRedirection,
          <Redirect to={`/workspace/${teamName}`} />,
          <SigninUserForm setWorkspaceRedirection={setWorkspaceRedirection} teamName={teamName} />,
        )
      )}
    </Fragment>
  );
};

export default SignInUser;

SignInUser.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      teamName: PropTypes.string,
    }),
  }).isRequired,
};
