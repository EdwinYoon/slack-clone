import React, { useState } from 'react';
import styled from 'styled-components';
import { SectionTitle, SectionItemList } from '../../../components/Sidebar';

// import ChannelList from '../ChannelList';
import dummyChannels from '../../../tmp/dummyChannels';

const SidebarChannelContainer = styled.div`
  flex: 3.75; /** LAYOUT */

  display: flex; /** CHILD */
  flex-direction: column;
`;

const SidebarChannel = () => {
  const [currentSelection, setCurrentSelection] = useState('');
  return (
    <SidebarChannelContainer>
      <SectionTitle title="Channels" />
      <SectionItemList
        items={dummyChannels.data}
        currentSelection={currentSelection}
        setCurrentSelection={setCurrentSelection}
      />
    </SidebarChannelContainer>
  );
};

export default SidebarChannel;
