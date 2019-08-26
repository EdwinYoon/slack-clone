import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const MessageSearchContainer = styled.div`
  flex: 0.6;
  display: flex;
  height: 100%;
  padding: 10px 20px;
  
  @media screen and (max-width: 800px) {
    flex: 1;
    padding: 5px 0px;

    justify-content: ${props => (props.expand ? '' : 'flex-end')};
    align-items: center;

    overflow: hidden;
  }

  .input_wrapper {
    display: flex;
    min-width: 200px;
    outline: none;

    &:hover {
      cursor: pointer;
      transition: all 0.3s ease;

      &.input_wrapper > i {
        border-top: 1px solid rgba(29, 28, 29, 0.5);
        border-bottom: 1px solid rgba(29, 28, 29, 0.5);
        border-left: 1px solid rgba(29, 28, 29, 0.5);

        color: rgba(65, 105, 225, 0.9);
        transition: all 0.3s ease;
      }

      &.input_wrapper > input {
        border-top: 1px solid rgba(29, 28, 29, 0.5);
        border-bottom: 1px solid rgba(29, 28, 29, 0.5);
        border-right: 1px solid rgba(29, 28, 29, 0.5);

        color: rgba(65, 105, 225, 0.9);
        transition: all 0.3s ease;
      }

      @media screen and (max-width: 800px) {
        &.input_wrapper > i {
          border: none;
        }

        &.input_wrapper > input {
          border: 1px solid rgba(29, 28, 29, 0.5);
        }
      }
    }

    @media screen and (max-width: 800px) {
      flex: 1;
      min-width: 50px;
      margin-left: 10px;
      //justify-content: ${props => (props.expand ? '' : 'flex-end')};
      transition: all 0.3s ease;

    }
  }

  .input_wrapper > i {
    flex: 1;
    min-width: 40px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    border-left: 1px solid lightgray;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background-color: #fff;
    transition: all 0.3s ease;

    @media screen and (max-width: 800px) {
      min-width: 50px;

      flex: ${props => (props.expand ? 0 : 1)};
      justify-content: ${props => (props.expand ? 'center' : 'flex-end')};
      margin-right: ${props => (props.expand ? '0px' : '20px')};

      outline: none;
      border: none;
    }
  }

  .input_wrapper > input {
    flex: 1;
    all: unset;
    padding: 5px 15px 5px 10px;

    font-size: 17px;
    font-family: 'Oxygen', sans-serif;
    font-weight: 200;

    caret-color: rgba(29, 28, 29, 0.5);
    border-left: none;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    border-right: 1px solid lightgray;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    transition: all 0.3s ease;

    color: #303030;
    background-color: #fff;

    @media screen and (max-width: 800px) {
      padding: ${props => (props.expand ? '5px 10px' : '0px 0px')};
      flex: ${props => (props.expand ? 1 : 0)};
      width: ${props => (props.expand ? '90%' : '0px')};
      height: ${props => (props.expand ? '50%' : '0px')};
      margin-right: ${props => (props.expand ? '10px' : '0px')};
      border: ${props => (props.expand ? '1px solid lightgray' : 'none')};
      border-radius: 5px;
    }
  }
`;

const MessageSearch = () => {
  const [expand, setExpand] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const width = document.querySelector('body').offsetWidth;

    setIsMobile(width <= 800);
  }, []);

  return (
    <MessageSearchContainer expand={expand}>
      <div className="input_wrapper">
        <i
          className={isMobile && expand ? 'fas fa-times fa-lg' : 'fas fa-search'}
          onClick={() => setExpand(!expand)}
          onKeyPress={() => {}}
          role="button"
          tabIndex="0"
        />
        <input type="text" />
      </div>
    </MessageSearchContainer>
  );
};

export default MessageSearch;
