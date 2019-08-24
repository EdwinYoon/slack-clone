import React from 'react';
import styled from 'styled-components';
import { WorkspaceHeader } from '../../../components/workspace';

const Container = styled.div`
  flex: 1;
  border: 1px solid red;
`;

const WorkspaceContainer = ({ isPublic, channelName }) => {
  console.log('');
  return (
    <Container>
      <WorkspaceHeader isPublic={isPublic} channelName={channelName} />
    </Container>
  );
};

export default WorkspaceContainer;
