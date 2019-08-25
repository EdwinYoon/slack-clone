import gql from 'graphql-tag';

export const SEND_MESSAGE = gql`
  mutation($text: String!, $teamId: String!, $channelId: String!) {
    sendMessage(text: $text, teamId: $teamId, channelId: $channelId) {
      approved
      errors {
        message
        path
      }
    }
  }
`;
