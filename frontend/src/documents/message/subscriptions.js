import gql from 'graphql-tag';

export const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription($channelId: String!) {
    newMessage(channelId: $channelId) {
      message {
        id
        text
        user {
          id
          email
        }
        createdAt
        updatedAt
      }
      channelId
    }
  }
`;
