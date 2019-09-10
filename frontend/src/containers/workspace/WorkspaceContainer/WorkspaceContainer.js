import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import { isEmpty } from 'ramda';
import { useLazyQuery } from '@apollo/react-hooks';
import { WorkspaceHeader } from '../../../components/workspace';
import WorkspaceInput from '../WorkspaceInput';
import WorkspaceBody from '../WorkspaceBody';
import { MESSAGES } from '../../../documents/message';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const WorkspaceContainer = ({ currentChannel }) => {
  const [getMessages, { data, loading, refetch }] = useLazyQuery(MESSAGES, {
    variables: { channelId: currentChannel.id || '' },
    skip: !currentChannel,
  });

  useEffect(() => {
    if (!isEmpty(currentChannel)) {
      if (!data) {
        getMessages();
      } else {
        refetch();
      }
    }
  }, [currentChannel]);

  return (
    <Container>
      {data && !loading && (
        <Fragment>
          <WorkspaceHeader currentChannel={currentChannel} />
          <WorkspaceBody
            messages={(data && data.messages.messages) || []}
            currentChannel={currentChannel}
          />
          <WorkspaceInput currentChannel={currentChannel} />
        </Fragment>
      )}
    </Container>
  );
};

export default WorkspaceContainer;
