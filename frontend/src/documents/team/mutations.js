import gql from 'graphql-tag';

export const SIGN_IN_WORKSPACE = gql`
  mutation($teamName: String!) {
    signinWorkspace(teamName: $teamName) {
      team {
        name
        id
      }
      errors {
        path
        message
      }
    }
  }
`;
