import React from 'react';
import styled from 'styled-components';
import ChannelList from '../ChannelList';

const SidebarChannelContainer = styled.div`
  flex: 3.75; /** LAYOUT */
  padding: 3% 3%;

  display: flex; /** CHILD */
  flex-direction: column;
`;

const SidebarChannel = () => (
  <SidebarChannelContainer>
    <ChannelList />
  </SidebarChannelContainer>
);

export default SidebarChannel;
