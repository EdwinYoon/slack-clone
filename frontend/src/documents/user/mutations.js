import gql from 'graphql-tag';

export const REGISTER_USER = gql`
  mutation($email: String!, $password: String!, $username: String!) {
    register(email: $email, password: $password, username: $username) {
      approved
      errors {
        message
        path
      }
    }
  }
`;

export const USER_LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      approved
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;
