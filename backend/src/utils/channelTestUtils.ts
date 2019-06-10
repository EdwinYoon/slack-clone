import { request } from 'graphql-request';

export async function createChannel(
  channelName: string,
  teamName: string,
  isPublic: boolean = true
) {
  const createChannelRequest = `
    mutation {
      createChannel(channelName: "${channelName}", teamName: "${teamName}", isPublic: ${isPublic}) {
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
    createChannelRequest
  );

  return response;
}
