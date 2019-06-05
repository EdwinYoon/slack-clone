import { request } from 'graphql-request';

const TEST_URL = process.env.TEST_HOST as string;

export async function register(
  email: string,
  password: string,
  username: string
) {
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
  const response = await request(TEST_URL, registerMutation);

  return response;
}

export async function login(email: string, password: string) {
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

  const response = await request(TEST_URL, loginMutation);

  return response;
}
