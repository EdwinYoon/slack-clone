import gql from 'graphql-tag';

export const GET_TEAM_BY_NAME = gql`
  query($name: String!) {
    getTeamByName(name: $name) {
      name
      id
      errors {
        path
        message
      }
    }
  }
`;
