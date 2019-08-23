import React, { useState } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { USER_LOGIN } from '../documents/user';

const SignInUserWrapper = styled.div`
  flex: 1; /** LAYOUT */
  padding: 2% 2% 1% 2%;
  margin: 20% auto 0% auto;
  max-width: 50%;
  min-width: 500px;
  min-height: 300px;
  max-height: 35%;

  display: flex;
  flex-direction: column;

  @media screen and (min-width: 1300px) {
    margin-top: 10%;
    max-height: 40%;
  }

  border: 1px solid lightgrey; /** EFFECT */
  border-radius: 10px;
  background-color: #fff;

  & > h1 {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .sub_title {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 5px;
  }

  .input_section {
    margin-top: 20px;
    flex: 2;
    display: flex;
    flex-direction: column;
  }

  .input_wrapper {
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;
  }

  .input_wrapper > div {
    flex: 0.4;
    margin-left: 10%;
    font-size: 17px;
    font-family: 'Rubik', sans-serif;
  }

  .input_wrapper > input {
    margin-top: 5px;
    flex: 0.6;
    min-height: 40px;
    max-height: 50px;
    margin-right: 5%;
    border: 1px solid lightgray;
    border-radius: 5px;
  }

  & > button {
    margin: 7% 20% 2% 20%;
    flex: 1;
    outline: none;
    border-radius: 5px;
    border: 1px solid lightgray;
    background-color: #007a5a;
    color: white;
    font-size: 20px;
    font-family: 'Oxygen', sans-serif;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
      transition: all 0.3s ease;
      opacity: 0.98;
      box-shadow: 0px 0px 10px rgba(88, 88, 88, 0.3);
      font-weight: 300;
    }
  }
`;

const SignInUser = ({ match: { params }, team }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, data }] = useMutation(USER_LOGIN, {
    onCompleted: ({ login }) => {
      localStorage.setItem('token', login.token);
      localStorage.setItem('refresh-token', login.refreshToken);
    },
  });

  /** Prevent Url injections || invalid approaches */
  if (!params.teamId || params.teamId !== team.id) return <Redirect to="/signin" />;

  if (loading) return <div>Loading...</div>;

  function onLogin(e) {
    e.preventDefault();
    login({ variables: { email, password } });
  }

  return (
    <SignInUserWrapper>
      <h1>{`Sign in to ${team.name || 'Team Name'}`}</h1>
      <div className="sub_title">Enter your Email and Password</div>
      <div className="input_section">
        <div className="input_wrapper">
          <div>Email</div>
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="input_wrapper">
          <div>Password</div>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
      </div>
      <button type="button" onClick={onLogin}>
        Sign In
      </button>
    </SignInUserWrapper>
  );
};

export default SignInUser;
