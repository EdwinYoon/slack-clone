import React from 'react';
import styled from 'styled-components';
import { WorkspaceHeader } from '../../../components/workspace';
import WorkspaceInput from '../WorkspaceInput';
import WorkspaceBody from '../WorkspaceBody';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const WorkspaceContainer = ({ currentChannel }) => {
  console.log('');
  return (
    <Container>
      <WorkspaceHeader currentChannel={currentChannel} />
      <WorkspaceBody />
      <WorkspaceInput currentChannel={currentChannel} />
    </Container>
  );
};

export default WorkspaceContainer;
