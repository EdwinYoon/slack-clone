import React from 'react';
import styled from 'styled-components';
import { SectionTitle, SectionItemList } from '../../../components/Sidebar';

const SidebarChannelContainer = styled.div`
  flex: 3.75; /** LAYOUT */

  display: flex; /** CHILD */
  flex-direction: column;
`;

const SidebarChannel = ({ channels, currentChannel, setCurrentChannel }) => (
  <SidebarChannelContainer>
    <SectionTitle title="Channels" />
    <SectionItemList
      items={channels}
      currentChannel={currentChannel}
      setCurrentChannel={setCurrentChannel}
    />
  </SidebarChannelContainer>
);

export default SidebarChannel;
