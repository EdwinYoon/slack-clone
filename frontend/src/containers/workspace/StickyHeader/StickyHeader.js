import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useStickyTracer } from '../../../hooks';

const StickyHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 50px;

  &.sticky {
    position: sticky;
    top: 0px;

    color: #101010;
    font-weight: 600;
    .horizontal_line {
      background-color: transparent;
    }
  }

  .horizontal_line {
    flex: 1;
    height: 1px;
    background-color: lightgray;
  }

  .sticky_header_time {
    position: relative;
    border-radius: 15px;
    z-index: 1;
    background-color: #fff;
    padding: 10px 15px;
    font-family: 'Rubik', sans-serif;
  }
`;

const StickyHeader = ({ message }) => {
  useStickyTracer('#body_container', '#sticky_header', 65);

  return (
    <StickyHeaderWrapper id="sticky_header">
      <div className="horizontal_line" />
      <div className="sticky_header_time overlay">
        {dayjs(message.createdAt).format('DD MMMM YYYY')}
      </div>
      <div className="horizontal_line" />
    </StickyHeaderWrapper>
  );
};

export default StickyHeader;
