import React, { useEffect, useState, Fragment } from 'react';
import styled from 'styled-components';
import { useSubscription } from '@apollo/react-hooks';
import { isEmpty } from 'ramda';
import dayjs from 'dayjs';
import { NEW_MESSAGE_SUBSCRIPTION } from '../../../documents/message';
import { MessageFrame } from '../../../components/message';
import StickyHeader from '../StickyHeader';

const BodyContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  overflow-x: scroll;
  background-color: #fff;
`;

const WorkspaceBody = ({ messages = [] }) => {
  const [messageList, setMessageList] = useState([]);
  const { data } = useSubscription(NEW_MESSAGE_SUBSCRIPTION);

  useEffect(() => {
    if (messages && !data) {
      setMessageList(messages);
    } else if (!isEmpty(messages) && data && isEmpty(messageList)) {
      setMessageList([...messages, data.newMessage]);
    } else if (!isEmpty(messageList) && data) {
      setMessageList([...messageList, data.newMessage]);
    }
  }, [messages, data]);

  return (
    <BodyContainer id="body_container">
      {messageList
        && messageList.map((message, index) => {
          if (index === 0) {
            return (
              <Fragment key={message.createdAt}>
                <StickyHeader message={message} />
                <MessageFrame message={message} />
              </Fragment>
            );
          }

          const previousDay = dayjs(messages[index - 1].createdAt).get('day');
          const currentDay = dayjs(message.createdAt).get('day');

          return previousDay !== currentDay ? (
            <Fragment key={message.createdAt}>
              <StickyHeader message={message} />
              <MessageFrame message={message} />
            </Fragment>
          ) : (
            <MessageFrame key={message.createdAt} message={message} />
          );
        })}
    </BodyContainer>
  );
};

export default WorkspaceBody;
