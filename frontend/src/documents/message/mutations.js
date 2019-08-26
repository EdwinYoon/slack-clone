import gql from 'graphql-tag';

export const SEND_MESSAGE = gql`
  mutation($text: String!, $userId: String!, $teamId: String!, $channelId: String!) {
    sendMessage(text: $text, userId: $userId, teamId: $teamId, channelId: $channelId) {
      approved
      errors {
        message
        path
      }
    }
  }
`;
