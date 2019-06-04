import React, { useState } from 'react';
import styled from 'styled-components';
import { SectionTitle, SectionItemList } from '../../../components/Sidebar';

const MessageContainer = styled.div`
  flex: 3.75; /** LAYOUT */
  //padding: 3% 5%;

  display: flex; /** CHILD */
  flex-direction: column;
`;

const SidebarMessageContainer = () => {
  const [currentSelection, setCurrentSelection] = useState('');
  return (
    <MessageContainer>
      <SectionTitle title="Direct Messages" />
      <SectionItemList
        items={[]}
        currentSelection={currentSelection}
        setCurrentSelection={setCurrentSelection}
      />
    </MessageContainer>
  );
};

export default SidebarMessageContainer;
