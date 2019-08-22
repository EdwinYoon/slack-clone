import React, { useState } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { useLazyQuery } from '@apollo/react-hooks';

import { GET_TEAM_BY_NAME } from '../documents/team';

const SignInWorkspaceWrapper = styled.div`
  flex: 1; /** LAYOUT */
  padding: 2% 2% 1% 2%;
  margin: 20% auto 0% auto;
  max-width: 50%;
  min-width: 500px;
  min-height: 300px;
  max-height: 35%;

  flex: 1;
  display: flex;
  flex-direction: column;

  border: 1px solid lightgrey; /** EFFECT */
  border-radius: 10px;
  background-color: #fff;

  font-family: 'lexend-giga', sans-serif;

  .title_section {
    flex: 1;
    display: flex;
    flex-direction: column;
    max-height: 80px;
  }

  .title_section > h1 {
    flex: 0.7;
    display: flex;
    justify-content: center;
  }

  .title_section > div {
    flex: 0.5;
    display: flex;
    justify-content: center;

    display: flex;
    justify-content: center;

    font-size: 17px;
    font-family: 'Oxygen', sans-serif;
  }

  @media screen and (max-width: 1200px) {
    padding-top: 5%;
  }

  .input_section_wrapper {
    margin-top: 3%;
    padding: 2% 2%;
    width: 100%;
    max-height: 70px;
    display: flex;

    flex: 1.5;

    & > div {
      flex: 1;
      display: flex;
      justify-content: center;

      font-size: 20px;
      font-family: 'Rubik', sans-serif;
      align-self: center;
    }

    & > input {
      flex: 1.5;
      padding: 2px 10px;

      font-size: 17px;
      outline: none;
      border: 0.9px solid lightgray;
      border-radius: 5px;
    }
  }
`;

const Button = styled.button`
  margin: 5% 2% 0% 2%;
  padding: 2% 3%;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  outline: none;
  border-radius: 5px;
  background-color: #007a5a;

  & > div {
    color: #fff;
    font-size: 19px;
    font-weight: 500;
    font-family: 'Lexend Giga', sans-serif;
  }

  & > i {
    margin-left: 10px;
    margin-top: 3px;
    color: #fff;
  }
`;

const SignInWorkspace = ({ team, setTeam }) => {
  const [teamName, setTeamName] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [getTeam, { loading }] = useLazyQuery(GET_TEAM_BY_NAME, {
    onCompleted: (data) => {
      if (data) {
        const {
          getTeamByName: { id, name },
        } = data;
        setTeam({ name, id });
        setRedirect(true);
      }
    },
  });

  if (loading) return <p>Loading ...</p>;

  async function onClickHandler(e) {
    e.preventDefault();
    getTeam({ variables: { name: teamName } });
  }

  function onChange({ target }) {
    setTeamName(target.value);
  }

  if (redirect) return <Redirect to={`/signin/${team.id}`} />;

  return (
    <SignInWorkspaceWrapper>
      <div className="title_section">
        <h1>Sign in to your workpsace</h1>
        <div className="sub_title">Enter your team name</div>
      </div>
      <div className="input_section_wrapper">
        <div>Your team is</div>
        <input type="text" placeholder="Your Team Name" value={teamName} onChange={onChange} />
      </div>
      <Button type="button" onClick={onClickHandler}>
        <div>Continue</div>
        <i className="fas fa-long-arrow-alt-right fa-2x" />
      </Button>
    </SignInWorkspaceWrapper>
  );
};

export default SignInWorkspace;
