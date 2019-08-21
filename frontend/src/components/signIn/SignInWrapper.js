import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  flex: 1; /** LAYOUT */
  padding: 3% 2%;
  margin: 20% auto 0% auto;
  max-width: 50%;
  min-width: 500px;
  min-height: 300px;
  max-height: 32%;

  display: flex;

  @media screen and (min-width: 1300px) {
    margin-top: 10%;
    max-height: 35%;
  }

  border: 1px solid lightgrey; /** EFFECT */
  border-radius: 10px;
  background-color: #fff;
`;

const SignInWrapper = props => <Wrapper>{props.children}</Wrapper>;

export default SignInWrapper;
