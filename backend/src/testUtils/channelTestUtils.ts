import { testRequest } from './common';

export function createChannel(channelName: string, isPublic: boolean = true) {
  const createChannelRequest = `
    mutation {
      createChannel(channelName: "${channelName}", isPublic: ${isPublic}) {
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
