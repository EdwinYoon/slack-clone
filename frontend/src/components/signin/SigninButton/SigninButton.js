import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

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

const SigninButtonWrapper = styled.div`
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
`;

const SigninButton = ({
  condition, onClickHandler, displayText, errorText,
}) => (
  <SigninButtonWrapper>
    <button
      type="button"
      className={condition ? 'result_warning' : 'button_normal'}
      onClick={onClickHandler}
    >
      {condition ? (
        <div className="warning_section">{errorText}</div>
      ) : (
        <>
          <div>{displayText}</div>
          <i className="fas fa-long-arrow-alt-right fa-2x" />
        </>
      )}
    </button>
  </SigninButtonWrapper>
);
export default SigninButton;

SigninButton.propTypes = {
  condition: PropTypes.bool.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  displayText: PropTypes.string.isRequired,
  errorText: PropTypes.string.isRequired,
};
