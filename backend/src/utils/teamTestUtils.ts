import { request } from 'graphql-request';

export async function createTeam(name: string, isPublic: boolean) {
  const createTeamMutation = `
    mutation {
      createTeam(name: "${name}", isPublic: ${isPublic}) {
        approved
        errors {
          path
          message
        }
      }
    }
  `;

  const response = await request(
    process.env.TEST_HOST as string,
    createTeamMutation
  );

  return response;
}
