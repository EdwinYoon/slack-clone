import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { SIGN_IN_WORKSPACE } from '../documents/team';

const shaker = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;

const SignInWorkspaceWrapper = styled.div`
  flex: 1; /** LAYOUT */
  max-width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 10%;

  .form_wrapper {
    width: 600px;
    height: 350px;

    padding: 30px 20px;

    display: flex;
    flex-direction: column;

    border: 1px solid lightgrey; /** EFFECT */
    border-radius: 10px;
    background-color: #fff;
    font-family: 'lexend-giga', sans-serif;

    @media screen and (max-width: 650px) {
      padding: 5% 5%;
      width: 90%;
      // height: 400px;
    }

    @media screen and (max-width: 500px) {
      padding: 0px 0px;
      height: 300px;
      width: 100%;
    }
  }

  .title_section {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-family: 'Oxygen', sans-serif;

    transition: all 0.3s ease;

    @media screen and (max-width: 650px) {
      margin-top: 15px;
      transition: all 0.3s ease;
    }
  }

  .section_title {
    flex: 1;
    font-size: 32px;
    display: flex;
    justify-content: center;

    @media screen and (max-width: 650px) {
      font-size: 24px;
    }

    @media screen and (max-width: 500px) {
      height: min-content;
      font-size: 20px;
      font-weight: 600;
    }
  }

  .sub_title {
    flex: 1;
    margin-top: 15px;
    display: flex;
    justify-content: center;

    display: flex;
    justify-content: center;

    font-size: 17px;
    @media screen and (max-width: 650px) {
      font-size: 15px;
    }

    @media screen and (max-width: 500px) {
      margin-top: 0;
    }
  }

  .input_section_wrapper {
    flex: 1;
    height: 30%;
    margin-top: 20px;
    padding: 25px 40px 35px 40px;
    width: 100%;
    display: flex;

    & > div {
      white-space: nowrap;
      flex: 0.8;
      display: flex;
      justify-content: center;

      font-size: 24px;
      font-weight: 500;
      font-family: 'Rubik', sans-serif;
      align-self: center;
      transition: all 0.3s ease;
    }

    & > input {
      margin-left: 20px;
      flex: 1.5;
      max-height: 60px;
      padding: 2px 10px;

      font-size: 17px;
      outline: none;
      border: 0.9px solid lightgray;
      border-radius: 5px;

      &.result_warning {
        border: 1px solid red;
        transition: all 0.3s;
      }
    }

    @media screen and (max-width: 650px) {
      overflow: hidden;
      margin-top: 10px;
      flex-direction: column;
      align-items: center;

      padding: 15px 20px 0px 20px;
      & > div {
        font-size: 20px;
        max-height: min-content;
        transition: all 0.3s ease;
      }

      & > input {
        width: 70%;
        margin: 10px 0px 0px 0px;
        max-height: 40px;
        flex: 1;
        padding: 2% 5%;
      }
    }

    @media screen and (max-width: 500px) {
      margin-top: 0;
    }
  }

  .button_wrapper {
    flex: 1;
    max-height: 140px;
    display: flex;
    padding: 0px 50px 20px 50px;

    @media screen and (max-width: 650px) {
      padding: 10px 50px;
      align-items: center;
    }

    button {
      all: unset;
      flex: 1;
      margin: 0% 20%;

      display: flex;
      justify-content: center;
      align-items: center;

      outline: none;
      border-radius: 5px;

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

      &.button_normal {
        background-color: #007a5a;
        transition: all 0.3s ease;
      }

      &.result_warning {
        background-color: #f2dede;
        border: 1px solid #ebccd1;
        animation: ${shaker} 0.6s cubic-bezier(0.45, 0.05, 0.15, 1) both;
        transform: translate3d(0, 0, 0);

        & > div {
          color: #a94442;
        }
      }

      @media screen and (max-width: 500px) {
        width: 40%;
        max-height: 60%;

        &.result_warning {
          width: 40%;
          max-height: 60%;
        }
      }

      &:hover {
        &.button_normal {
          background-color: #fff;
          transition: all 0.3s ease;
          border: 1px solid #007a5a;

          & > div {
            color: #007a5a;
          }

          & > i {
            color: #007a5a;
          }
        }

        &.result_warning {
          background-color: #fff;
          transition: all 0.3s ease;
          border: 1px solid #ebccd1;

          & > div {
            color: #a94442;
          }
        }
      }

      @media screen and (max-width: 650px) {
        margin: 0px 10%;

        & > div {
          color: #fff;
          font-size: 15px;
          font-weight: 500;
          font-family: 'Lexend Giga', sans-serif;
        }

        .warning_section {
          white-space: nowrap;
          margin: 0;
          min-height: 41px;
          display: flex;
          align-items: center;

          @media screen and (max-width: 340px) {
            font-size: 14px;
          }
        }
      }
    }
  }
`;

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

  if (redirect) return <Redirect to={`/signin/${teamName}`} />;

  function onClickHandler(e) {
    e.preventDefault();
    setTimeout(getTeam, 500);
  }

  function onKeyPress(e) {
    if (e.which === 13) {
      onClickHandler(e);
    }
  }

  function onChange({ target }) {
    setTeamName(target.value);
  }

  return (
    <SignInWorkspaceWrapper>
      <div className="form_wrapper">
        <div className="title_section">
          <div className="section_title">Sign in to your workpsace</div>
          <div className="sub_title">Enter your team name</div>
        </div>
        <div className="input_section_wrapper">
          <div>Your team is</div>
          <input
            type="text"
            ref={inputRef}
            className={data && data.signinWorkspace.errors && !teamName ? 'result_warning' : ''}
            placeholder="Your Team Name"
            value={teamName}
            onChange={onChange}
            onKeyPress={onKeyPress}
          />
        </div>
        <div className="button_wrapper">
          <button
            type="button"
            className={
              data && data.signinWorkspace.errors && !teamName ? 'result_warning' : 'button_normal'
            }
            onClick={onClickHandler}
          >
            {data && data.signinWorkspace.errors && !teamName ? (
              <div className="warning_section">Please try again</div>
            ) : (
              <>
                <div>Continue</div>
                <i className="fas fa-long-arrow-alt-right fa-2x" />
              </>
            )}
          </button>
        </div>
      </div>
    </SignInWorkspaceWrapper>
  );
};

export default SignInWorkspace;
