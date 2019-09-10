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

  overflow-y: scroll;
  overflow-x: hidden;
  background-color: #fff;
`;

const WorkspaceBody = ({ messages = [], currentChannel }) => {
  const [messageList, setMessageList] = useState([]);
  const { data } = useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
    variables: { channelId: (!isEmpty(currentChannel) && currentChannel.id) || '' },
  });

  useEffect(() => {
    if (messages) {
      setMessageList(messages);
    }
  }, [currentChannel, messages]);

  useEffect(() => {
    if (!isEmpty(messages) && data && isEmpty(messageList)) {
      setMessageList([...messages, data.newMessage.message]);
    } else if (!isEmpty(messageList) && data) {
      if (data.newMessage.channelId === currentChannel.id) {
        setMessageList([...messageList, data.newMessage.message]);
      }
    }
  }, [data]);

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

          const previousDay = dayjs(messageList[index - 1].createdAt).get('day');
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
