import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MessageSearch from '../MessageSearch';

const WorkspaceHeaderContainer = styled.div`
  width: 100%;
  border: 1px solid red;
  height: 60px;
  border: 1px solid lightgray;
  background-color: #fff;

  display: flex;
  align-items: center;

  font-family: 'Lexend-Giga', sans-serif;

  .channel_title_section {
    flex: 0.4;
    padding: 0% 2%;
    font-size: 22px;
    font-family: 'Lexend-Giga', sans-serif;
    font-family: 'Oxygen', sans-serif;

    display: flex;
    align-items: center;
    transition: all 0.3s ease-out;

    @media screen and (max-width: 800px) {
      padding: 0% 2% 0% 4%;
      font-size: 18px;
      transition: all 0.3s ease-in;
    }
  }

  .public_indicator {
    &.alignment {
      margin-top: 5px;
    }

    @media screen and (max-width: 800px) {
      font-size: 18px;
    }
  }

  .channel_title {
    margin-left: 5px;
  }
`;

const WorkspaceHeader = ({ currentChannel }) => {
  const { isPublic, name } = currentChannel;
  return (
    <WorkspaceHeaderContainer>
      <div className="channel_title_section">
        <div className={`public_indicator ${isPublic && 'alignment'}`}>
          {isPublic ? '#' : <i className="fas fa-lock fa-xs" />}
        </div>
        <div className="channel_title">{name}</div>
      </div>
      <MessageSearch />
    </WorkspaceHeaderContainer>
  );
};

export default WorkspaceHeader;

WorkspaceHeader.propTypes = {
  currentChannel: PropTypes.shape({
    id: PropTypes.string,
    isPublic: PropTypes.bool,
    name: PropTypes.string,
  }).isRequired,
};
