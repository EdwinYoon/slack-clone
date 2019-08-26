import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLazyQuery } from '@apollo/react-hooks';
import { WorkspaceHeader } from '../../../components/workspace';
import WorkspaceInput from '../WorkspaceInput';
import WorkspaceBody from '../WorkspaceBody';
import { MESSAGES } from '../../../documents/message';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const WorkspaceContainer = ({ currentChannel }) => {
  const [getMessages, { data, loading }] = useLazyQuery(MESSAGES, {
    variables: { channelId: currentChannel.id || '' },
  });

  useEffect(() => {
    if (!data) getMessages();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <WorkspaceHeader currentChannel={currentChannel} />
      <WorkspaceBody messages={(data && data.messages) || []} />
      <WorkspaceInput currentChannel={currentChannel} />
    </Container>
  );
};

export default WorkspaceContainer;
