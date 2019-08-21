import React from 'react';
import styled from 'styled-components';
import { ContinueButton } from '../components/buttons';

const SignInWorkspaceWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  font-family: 'lexend-giga', sans-serif;

  h1 {
    display: flex;
    justify-content: center;
  }

  .sub_title {
    margin-top: 2%;

    display: flex;
    justify-content: center;

    font-size: 17px;
    font-family: 'Oxygen', sans-serif;
  }
  @media screen and (max-width: 1200px) {
    padding-top: 5%;
  }

  .input_section_wrapper {
    margin-top: 5%;
    padding: 2% 2%;
    width: 100%;
    display: flex;

    height: 60px;

    & > div {
      flex: 0.4;
      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 20px;
    }

    & > input {
      flex: 0.5;
      padding: 2px 10px;

      font-size: 17px;
      outline: none;
      border: 0.9px solid lightgray;
      border-radius: 5px;
    }
  }
`;

const SignInWorkspace = () => (
  <SignInWorkspaceWrapper>
    <h1>Sign in to your workpsace</h1>
    <div className="sub_title">Enter your team name</div>
    <div className="input_section_wrapper">
      <div>Your team is</div>
      <input type="text" placeholder="Your Team Name" />
    </div>
    <ContinueButton />
  </SignInWorkspaceWrapper>
);

export default SignInWorkspace;
