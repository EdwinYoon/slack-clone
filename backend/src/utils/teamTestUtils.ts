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

export async function publicTeams() {
  const publicTeamsQuery = `
    query {
      publicTeams {
        teams {
          id
          name
          isPublic
        }
        errors {
          message
          path
        }
      }
    }
  `;

  const response = await request(
    process.env.TEST_HOST as string,
    publicTeamsQuery
  );

  return response;
}
