import gql from 'graphql-tag';

export const MESSAGES = gql`
  query($channelId: String!) {
    messages(channelId: $channelId) {
      messages {
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
