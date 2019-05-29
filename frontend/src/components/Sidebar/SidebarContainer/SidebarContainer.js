import React from 'react';
import styled from 'styled-components';
import SidebarHeader from '../SidebarHeader';
import { SidebarChannel } from '../../channel';
import { SidebarMessage } from '../../message';

const SidebarOuterContainer = styled.div`
  min-width: 250px;
  border: none;

  display: flex;
  flex-direction: column;

  background-color: #303e4d;
`;

const SidebarContainer = () => (
  <SidebarOuterContainer>
    <SidebarHeader />
    <SidebarChannel />
    <SidebarMessage />
  </SidebarOuterContainer>
);

export default SidebarContainer;
