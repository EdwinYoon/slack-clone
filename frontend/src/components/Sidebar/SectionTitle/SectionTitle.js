import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SectionTitleContainer = styled.div`
  width: 100%;
  padding: 5px 15px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-weight: 400;
  font-family: 'Raleway', sans-serif;

  color: rgba(193, 197, 202, 1); /** EFFECT */
  transition: all 0.2s ease;

  .section-title {
    transition: all 0.2s ease;
    &:hover {
      cursor: pointer;
      color: #fff;
      transition: all 0.2s ease;
    }
  }

  .section-expand-icon {
    transition: all 0.2s ease;
    &:hover {
      cursor: pointer;
      color: #eee;
      transition: all 0.2s ease;
    }
  }
`;

const SectionTitle = ({ title }) => (
  <SectionTitleContainer>
    <div className="section-title">{title}</div>
    <div className="section-expand-icon">
      <i className="fas fa-plus-circle" />
    </div>
  </SectionTitleContainer>
);

export default SectionTitle;

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
