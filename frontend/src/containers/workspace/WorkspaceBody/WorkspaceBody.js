import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSubscription } from '@apollo/react-hooks';
import { isEmpty } from 'ramda';
import { NEW_MESSAGE_SUBSCRIPTION } from '../../../documents/message';

const BodyContainer = styled.div`
  flex: 1;

  overflow-x: scroll;
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
    <BodyContainer>
      {messageList && messageList.map(({ text, createdAt }) => <div key={createdAt}>{text}</div>)}
    </BodyContainer>
  );
};

export default WorkspaceBody;
