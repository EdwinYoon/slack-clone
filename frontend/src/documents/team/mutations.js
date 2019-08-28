import gql from 'graphql-tag';

export const SIGN_IN_WORKSPACE = gql`
  mutation($name: String!) {
    signinWorkspace(name: $name) {
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
