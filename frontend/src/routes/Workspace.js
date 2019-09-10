import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { isEmpty } from 'ramda';
import { GET_CHANNELS } from '../documents/channel';
import { SidebarContainer } from '../components/Sidebar';
import { WorkspaceContainer } from '../containers/workspace';

const WorkspaceWrapper = styled.div`
  flex: 1;

  display: flex;
`;

/**
 * TODO:
 *  Currently, the component use its state to manage
 *  selected channel, in this way, every refresh might
 *  be affected to user experience
 *  come up with better idea!!!
 */

const Workspace = () => {
  const { data, loading } = useQuery(GET_CHANNELS);
  const [currentChannel, setCurrentChannel] = useState({});

  useEffect(() => {
    if (data && isEmpty(currentChannel) && data.channels) {
      if (!data.channels.errors) {
        setCurrentChannel(data.channels.channels[0]);
      }
    }
  }, [data]);

  return (
    <WorkspaceWrapper>
      {!loading && data && (
        <SidebarContainer
          channels={data && data.channels.channels}
          currentChannel={currentChannel}
          setCurrentChannel={setCurrentChannel}
        />
      )}
      <WorkspaceContainer currentChannel={currentChannel} />
    </WorkspaceWrapper>
  );
};

export default Workspace;
