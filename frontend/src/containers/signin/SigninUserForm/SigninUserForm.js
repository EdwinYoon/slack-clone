import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import { USER_LOGIN } from '../../../documents/user';
import {
  SigninContainer,
  SigninFormWrapper,
  SigninButton,
  SigninInput,
  SigninTitle,
} from '../../../components/signin';

const UserForm = styled(SigninFormWrapper)`
  .input_section {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  @media screen and (max-width: 650px) {
    padding: 5% 5% 2% 5%;
    height: 450px;
  }
`;

const SigninUserForm = ({ setWorkspaceRedirection, teamName }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginWarning, setLoginWarning] = useState(false);
  const [login, { data }] = useMutation(USER_LOGIN, {
    variables: { email, password },
  });

  useEffect(() => {
    if (data && data.login.approved) {
      const { user } = data.login;

      localStorage.setItem('userId', user.id);

      setWorkspaceRedirection(true);
      setEmail('');
      setPassword('');
    } else {
      if (data && data.login.errors) {
        setLoginWarning(true);
      }
      setEmail('');
      setPassword('');
    }
  }, [data]);

  function onLogin(e) {
    e.preventDefault();
    login();
  }

  function onKeyPress(e) {
    if (e.which === 13) {
      onLogin(e);
    }
  }

  return (
    <SigninContainer>
      <UserForm>
        <SigninTitle
          title={`Sign in to ${teamName || 'Team Name'}`}
          subTitle="Enter your Email and Password"
        />
        <div className="input_section">
          <SigninInput
            value={email}
            setValue={setEmail}
            onKeyPress={() => {}}
            inputRef={null}
            condition={loginWarning}
            labelText="Email"
            placeholder="Please enter your email"
            type="text"
            padding="0px 40px"
          />
          <SigninInput
            value={password}
            setValue={setPassword}
            onKeyPress={onKeyPress}
            inputRef={null}
            condition={loginWarning}
            placeholder="Please enter your password"
            type="password"
            labelText="Password"
            padding="0px 40px 30px 40px"
          />
        </div>
        <SigninButton
          condition={data && !data.login.approved}
          onClickHandler={onLogin}
          displayText="Sign in"
          errorText={
            (data
              && data.login.errors
              && data.login.errors[0].path === 'auth'
              && data.login.errors[0].message)
            || 'Please try again'
          }
        />
      </UserForm>
    </SigninContainer>
  );
};

export default SigninUserForm;

SigninUserForm.propTypes = {
  setWorkspaceRedirection: PropTypes.func.isRequired,
  teamName: PropTypes.string.isRequired,
};
