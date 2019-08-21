import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  margin: 2% 2%;
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

const ContinueButton = () => (
  <Button>
    <div>Continue</div>
    <i className="fas fa-long-arrow-alt-right fa-2x" />
  </Button>
);

export default ContinueButton;
