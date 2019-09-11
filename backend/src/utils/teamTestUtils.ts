import { request } from 'graphql-request';

const testRequest = async queryString =>
  request(process.env.TEST_HOST as string, queryString);

export function createTeam(name: string, isPublic: boolean) {
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

  return testRequest(createTeamMutation);
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

  return testRequest(publicTeamsQuery);
}

export function signinWorkspace(teamName: string) {
  const signinWorkplaceMutation = `
    mutation {
      signinWorkspace(teamName: "${teamName}") {
        team {
          id
          name
          isPublic
        }
        errors {
          path
          message
        }
      }
    } 
  `;

  return testRequest(signinWorkplaceMutation);
}
