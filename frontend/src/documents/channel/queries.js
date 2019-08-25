import gql from 'graphql-tag';

export const GET_CHANNELS = gql`
  query($teamName: String!) {
    channels(teamName: $teamName) {
      id
      name
      isPublic
    }
  }
`;
