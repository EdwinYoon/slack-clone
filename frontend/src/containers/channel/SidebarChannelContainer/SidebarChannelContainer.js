import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SectionTitle, SectionItemList } from '../../../components/Sidebar';

const SidebarChannelContainer = styled.div`
  flex: 3.75; /** LAYOUT */

  display: flex; /** CHILD */
  flex-direction: column;
`;

const SidebarChannel = ({ channels, currentChannel, setCurrentChannel }) => (
  <SidebarChannelContainer>
    <SectionTitle title="Channels" />
    <SectionItemList
      items={channels}
      currentChannel={currentChannel}
      setCurrentChannel={setCurrentChannel}
    />
  </SidebarChannelContainer>
);

export default SidebarChannel;

SidebarChannel.propTypes = {
  channels: PropTypes.arrayOf(
    PropTypes.shape({
      channelType: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      isPublic: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  currentChannel: PropTypes.shape({
    id: PropTypes.string,
    isPublic: PropTypes.bool,
    name: PropTypes.string,
  }).isRequired,
  setCurrentChannel: PropTypes.func.isRequired,
};
