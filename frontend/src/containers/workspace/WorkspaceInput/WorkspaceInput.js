import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import { SEND_MESSAGE } from '../../../documents/message';

const InputWrapper = styled.div`
  padding: 10px 20px 20px 20px;
  width: 100%;
  min-height: 60px;

  display: flex;

  input {
    flex: 1;
    padding: 10px 20px;
    font-size: 17px;
    font-family: 'Raleway', sans-serif;

    outline: none;
    border: 1px solid lightgray;
    border-radius: 5px;
  }
`;

const WorkspaceInput = ({ currentChannel }) => {
  const [messageText, setMessageText] = useState('');
  const [sendMessage] = useMutation(SEND_MESSAGE, {
    variables: {
      text: messageText,
      channelId: currentChannel.id,
    },
  });

  function onChange(e) {
    setMessageText(e.target.value);
  }

  function onKeyPress(e) {
    if (e.which === 13 && messageText) {
      sendMessage();
      setMessageText('');
    }
  }

  return (
    <InputWrapper>
      <input type="text" value={messageText} onChange={onChange} onKeyPress={onKeyPress} />
    </InputWrapper>
  );
};

export default WorkspaceInput;
