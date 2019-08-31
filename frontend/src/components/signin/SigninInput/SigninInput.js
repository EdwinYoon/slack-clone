import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  flex: 1;
  height: 30%;
  margin-top: 20px;
  padding: ${props => (props.padding ? props.padding : '25px 40px 35px 40px')};
  width: 100%;
  display: flex;

  & > div {
    white-space: nowrap;
    flex: 0.8;
    display: flex;
    justify-content: flex-end;

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
    min-height: 45px;
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
`;

const Input = ({
  value,
  setValue,
  onKeyPress,
  inputRef,
  condition,
  labelText,
  type,
  padding,
  placeholder,
}) => (
  <InputWrapper padding={padding}>
    <div>{labelText}</div>
    <input
      type={type}
      ref={inputRef}
      className={condition ? 'result_warning' : ''}
      placeholder={placeholder}
      value={value}
      onChange={e => setValue(e.target.value)}
      onKeyPress={onKeyPress}
    />
  </InputWrapper>
);

export default Input;
