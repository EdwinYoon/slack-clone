import React, { useMemo } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

const MessageFrameContainer = styled.div`
  padding: 10px 20px;

  display: flex;
  font-size: 17px;
  font-family: 'Roboto-Slap', sans-serif;
  color: #404040;

  .message_section {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
  }

  .message_info_section {
    display: flex;
    align-items: center;
  }

  .user_indicator {
    font-weight: 600;
  }

  .message_time {
    font-size: 14px;
    margin-left: 15px;
    color: #686868;
  }

  i {
    color: #add8e6;
  }

  .message_body {
    font-weight: 200;
  }
`;

const MessageFrame = ({ message }) => {
  const time = useMemo(() => dayjs(message.updatedAt).format('hh:mm A'), [message]);
  return (
    <MessageFrameContainer>
      <i className="fas fa-user-circle fa-2x" />
      <div className="message_section">
        <div className="message_info_section">
          <div className="user_indicator">{message.user.email}</div>
          <div className="message_time">{time}</div>
        </div>
        <div className="message_body">{message.text}</div>
      </div>
    </MessageFrameContainer>
  );
};

export default MessageFrame;
