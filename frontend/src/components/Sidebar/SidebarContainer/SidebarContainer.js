import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import SidebarHeader from '../SidebarHeader';
import { SidebarChannelContainer } from '../../../containers/channel';
import { SidebarMessageContainer } from '../../../containers/message';

const SidebarOuterContainer = styled.div`
  min-width: 250px;
  border: none;

  display: flex;
  flex-direction: column;

  background-color: #303e4d;
`;

const SidebarContainer = props => (
  <SidebarOuterContainer>
    <SidebarHeader title="Neat-Coder" username="Edwin" />
    <SidebarChannelContainer {...props} />
    <SidebarMessageContainer {...props} />
  </SidebarOuterContainer>
);

export default SidebarContainer;
