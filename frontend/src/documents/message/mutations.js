import gql from 'graphql-tag';

export const SEND_MESSAGE = gql`
  mutation($text: String!, $channelId: String!) {
    sendMessage(text: $text, channelId: $channelId) {
      approved
      errors {
        message
        path
      }
    }
  }
`;
