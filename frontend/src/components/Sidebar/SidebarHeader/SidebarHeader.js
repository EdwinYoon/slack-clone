import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SidebarHeaderContainer = styled.div`
  flex: 2.5; /** LAYOUT */
  padding: 5% 5%;

  display: flex; /** CHILD */
  flex-direction: column;

  font-family: 'Roboto Slap', sans-serif; /** FONT */

  transition: all 0.3s ease; /** EFFECT */
  cursor: pointer;

  &:hover {
    background-color: #2c3849 !important;
    transition: all 0.3s ease;

    .header-user-info {
      color: #fff;
    }
  }

  .header-sub-wrapper {
    display: flex; /** CHILD */
    justify-content: space-between;
    align-items: cener;
  }

  .header-title {
    font-size: 18px;
    font-weight: 600;
    color: #fff;
  }

  .header-user-info {
    font-family: 'Roboto', sans-serif; /** FONT */
    font-size: 14px;
    font-weight: 100;

    color: rgb(193, 197, 202); /** EFFECT */
    transition: all 0.2s ease;
  }

  .header-icon {
    margin-right: 2%;

    &.far,
    .fa-bell {
      color: rgb(193, 197, 202);
      transition: all 0.3s ease;

      &:hover {
        color: #fff;
        transition: all 0.3s ease;
      }
    }
  }
`;

const SidebarHeader = ({ title = 'Neat-Coder', username = 'Edwin' }) => (
  <SidebarHeaderContainer>
    <div className="header-sub-wrapper">
      <div className="header-title">{title}</div>
      <div className="header-icon">
        <i className="far fa-bell fa-lg" />
      </div>
    </div>
    <div className="header-user-info">{username}</div>
  </SidebarHeaderContainer>
);

export default SidebarHeader;

SidebarHeader.propTypes = {
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
