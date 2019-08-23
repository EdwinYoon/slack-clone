import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { GET_CHANNELS } from '../../../documents/channel';
import { SectionTitle, SectionItemList } from '../../../components/Sidebar';

// import ChannelList from '../ChannelList';
import dummyChannels from '../../../tmp/dummyChannels';

const SidebarChannelContainer = styled.div`
  flex: 3.75; /** LAYOUT */

  display: flex; /** CHILD */
  flex-direction: column;
`;

const SidebarChannel = ({ team }) => {
  const [currentSelection, setCurrentSelection] = useState('');
  const { data, loading } = useQuery(GET_CHANNELS, { variables: { teamName: team.name } });

  if (loading) return <div>Loading...</div>;
  return (
    <SidebarChannelContainer>
      <SectionTitle title="Channels" />
      <SectionItemList
        items={data && data.channels}
        currentSelection={currentSelection}
        setCurrentSelection={setCurrentSelection}
      />
    </SidebarChannelContainer>
  );
};

export default SidebarChannel;
