import React from 'react';
import styled from 'styled-components';

const SigninTitleWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  font-family: 'Oxygen', sans-serif;

  transition: all 0.3s ease;

  @media screen and (max-width: 650px) {
    margin-top: 15px;
    transition: all 0.3s ease;
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
`;

const SigninTitle = ({ title, subTitle }) => (
  <SigninTitleWrapper>
    <div className="section_title">{title}</div>
    <div className="sub_title">{subTitle}</div>
  </SigninTitleWrapper>
);

export default SigninTitle;
