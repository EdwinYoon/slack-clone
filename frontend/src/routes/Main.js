import React from 'react';
import styled from 'styled-components';
import { SidebarContainer } from '../components/Sidebar';

const MainContainer = styled.div`
  flex: 1;

  display: flex;
`;

const MainBody = styled.div`
  flex: 1;
  border: 1px solid red;
`;

const Main = () => (
  <MainContainer>
    <SidebarContainer />
    <MainBody>Main Body</MainBody>
  </MainContainer>
);

export default Main;
