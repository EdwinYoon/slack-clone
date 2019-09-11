import { testRequest } from './common';

export function register(email: string, password: string, username: string) {
  const registerMutation = `
    mutation {
      register(email: "${email}", password: "${password}", username: "${username}") {
        approved
        errors {
          path
          message
        }
      }
    } 
  `;

  return testRequest(registerMutation);
}

export function login(email: string, password: string) {
  const loginMutation = `
  mutation {
    login(email: "${email}", password: "${password}") {
      approved
      errors {
        path
        message 
      }
    }
  }`;

  return testRequest(loginMutation);
}
