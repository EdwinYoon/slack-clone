import * as rp from 'request-promise';

export default class TestClient {
  url: string;
  options: {
    jar: any;
    withCredentials: boolean;
    json: boolean;
  };

  constructor(url: string) {
    this.url = url;
    this.options = {
      withCredentials: true,
      jar: rp.jar(),
      json: true,
    };
  }

  createTeam(teamName: string) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            createTeam(name: "${teamName}", isPublic: ${true}) {
              approved
              errors {
                path
                message
              }
            }
          }
        `,
      },
    });
  }

  signinWorkspace(teamName: string) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
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
        `,
      },
    });
  }

  registerToTeam(email: string, password: string) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            registerToTeam(email: "${email}", password: "${password}") {
              approved
              errors {
                path
                message
              }
            }
          } 
        `,
      },
    });
  }

  login(email: string, password: string) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            login(email: "${email}", password: "${password}") {
              approved
              errors {
                path
                message 
              }
            }
          }
        `,
      },
    });
  }

  createChannel(channelName: string, isPublic: boolean) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            createChannel(channelName: "${channelName}", isPublic: ${isPublic}) {
              approved
              errors {
                path
                message
              }
            }
          } 
        `,
      },
    });
  }
}
