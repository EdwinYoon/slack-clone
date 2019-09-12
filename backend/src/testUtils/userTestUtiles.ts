import { testRequest } from './common';

export function registerToTeam(email: string, password: string) {
  const registerMutation = `
    mutation {
      registerToTeam(email: "${email}", password: "${password}") {
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
