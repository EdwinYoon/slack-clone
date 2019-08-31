import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { SIGN_IN_WORKSPACE } from '../documents/team';
import {
  SigninContainer,
  SigninFormWrapper,
  SigninButton,
  SigninInput,
  SigninTitle,
} from '../components/signin';

const SignInWorkspace = () => {
  const [teamName, setTeamName] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [getTeam, { data }] = useMutation(SIGN_IN_WORKSPACE, {
    variables: { teamName },
  });

  const inputRef = useRef(null);

  useEffect(() => {
    if (data && !data.signinWorkspace.errors) {
      const {
        signinWorkspace: { team },
      } = data;
      if (team) {
        localStorage.setItem('teamId', team.id);
        localStorage.setItem('teamName', team.name);
        setRedirect(true);
      }
    } else if (data && data.signinWorkspace.errors) {
      setTeamName('');
      inputRef.current.focus();
    }
  }, [data]);

  function onClickHandler(e) {
    e.preventDefault();
    setTimeout(getTeam, 500);
  }

  function onKeyPress(e) {
    if (e.which === 13) {
      onClickHandler(e);
    }
  }

  return (
    <SigninContainer>
      {redirect ? (
        <Redirect to={`/signin/${teamName}`} />
      ) : (
        <SigninFormWrapper>
          <SigninTitle title="Sign in to your workpsace" subTitle="Enter your team name" />
          <SigninInput
            value={teamName}
            inputRef={inputRef}
            setValue={setTeamName}
            onKeyPress={onKeyPress}
            condition={data && data.signinWorkspace.errors && !teamName}
            labelText="Your Team is "
            type="text"
          />
          <SigninButton
            condition={data && data.signinWorkspace.errors && !teamName}
            onClickHandler={onClickHandler}
            displayText="Continue"
            errorText="Please Try Again"
          />
        </SigninFormWrapper>
      )}
    </SigninContainer>
  );
};

export default SignInWorkspace;
