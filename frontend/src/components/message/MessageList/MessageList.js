import React from 'react';
import styled from 'styled-components';

const MessageListContainer = styled.div`
  flex: 1; /** LAYOUT */

  display: flex; /** CHILD */
  flex-direction: column;

  border: 1px solid red; /** EFFECT */
`;

const MessageList = () => <MessageListContainer>This is the message List </MessageListContainer>;

export default MessageList;
