import gql from 'graphql-tag';

export const GET_CHANNELS = gql`
  query {
    channels {
      channels {
        id
        name
        isPublic
        channelType
      }

      errors {
        path
        message
      }
    }
  }
`;
