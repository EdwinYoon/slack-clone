import { testRequest } from './common';

export function createChannel(
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

  return testRequest(createChannelRequest);
}
