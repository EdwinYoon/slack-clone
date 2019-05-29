import React from 'react';
import styled from 'styled-components';
import MessageList from '../MessageList';

const SidebarMessageContainer = styled.div`
  flex: 3.75; /** LAYOUT */
  padding: 3% 3%;

  display: flex; /** CHILD */
  border: 1px solid purple;
`;

const SidebarMessage = () => (
  <SidebarMessageContainer>
    <MessageList />
  </SidebarMessageContainer>
);

export default SidebarMessage;
