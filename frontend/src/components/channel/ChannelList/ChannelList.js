import React from 'react';
import styled from 'styled-components';

const ChannelListContainer = styled.div`
  flex: 1; /** LAYOUT */

  border: 1px solid red; /** Effect */
`;

const ChannelList = () => <ChannelListContainer>This is the list</ChannelListContainer>;

export default ChannelList;
