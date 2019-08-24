import React from 'react';
import styled from 'styled-components';
import { SidebarContainer } from '../components/Sidebar';
import { WorkspaceContainer } from '../containers/workspace';

const WorkspaceWrapper = styled.div`
  flex: 1;

  display: flex;
`;

const Workspace = ({ team }) => {
  /** TODO:
   *  WIRE THIS COMPONENT UP with channel selection features
   */
  console.log();
  return (
    <WorkspaceWrapper>
      <SidebarContainer team={team} />
      <WorkspaceContainer isPublic channelName="general" />
    </WorkspaceWrapper>
  );
};

export default Workspace;
