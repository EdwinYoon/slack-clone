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

const Workspace = ({ match }) => {
  const { data, loading } = useQuery(GET_CHANNELS, {
    variables: { teamName: match.params.teamName },
  });
  const [currentChannel, setCurrentChannel] = useState({});

  useEffect(() => {
    if (isEmpty(currentChannel) && data && !loading) {
      setCurrentChannel(data.channels[0]);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  return (
    <WorkspaceWrapper>
      <SidebarContainer
        channels={data && data.channels}
        currentChannel={currentChannel}
        setCurrentChannel={setCurrentChannel}
      />
      <WorkspaceContainer currentChannel={currentChannel} />
    </WorkspaceWrapper>
  );
};

export default Workspace;
