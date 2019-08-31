import styled from 'styled-components';

export const SigninContainer = styled.div`
  flex: 1; /** LAYOUT */
  max-width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 10%;
`;

export const SigninFormWrapper = styled.div`
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
  }

  @media screen and (max-width: 500px) {
    padding: 0px 0px;
    height: 300px;
    width: 100%;
  }
`;
