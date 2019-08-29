// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation | ISubscription;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: 'Query';
    channels: IChannelsResponse;
    messages: Array<IMessage | null>;
    publicTeams: IPublicTeamsResponse;
    getUsersByTeam: IGetUsersByTeamResponse;
    hello: string;
    me: IUser | null;
  }

  interface IMessagesOnQueryArguments {
    channelId: string;
  }

  interface IHelloOnQueryArguments {
    name?: string | null;
  }

  interface IChannelsResponse {
    __typename: 'ChannelsResponse';
    channels: Array<IChannel | null> | null;
    errors: Array<IError> | null;
  }

  interface IChannel {
    __typename: 'Channel';
    id: string;
    name: string;
    isPublic: boolean;
    team: string;
    channelType: string;
  }

  interface IError {
    __typename: 'Error';
    path: string;
    message: string;
  }

  interface IMessage {
    __typename: 'Message';
    id: string;
    text: string;
    createdAt: any;
    updatedAt: any;
    user: IUser | null;
  }

  interface IUser {
    __typename: 'User';
    id: string;
    email: string;
  }

  interface IPublicTeamsResponse {
    __typename: 'PublicTeamsResponse';
    teams: Array<ITeam> | null;
    errors: Array<IError> | null;
  }

  interface ITeam {
    __typename: 'Team';
    id: string;
    name: string;
    isPublic: boolean | null;
  }

  interface IGetUsersByTeamResponse {
    __typename: 'getUsersByTeamResponse';
    users: Array<IUserResponse> | null;
    errors: Array<IError> | null;
  }

  interface IUserResponse {
    __typename: 'UserResponse';
    userId: string;
    username: string;
  }

  interface IMutation {
    __typename: 'Mutation';
    createChannel: ICreateChannelResponse;
    createDirectMessageChannel: ICreateDirectMessageChannelResponse;
    sendMessage: ISendMessageResponse;
    createTeam: ICreateTeamResponse;
    signinWorkspace: ISigninWorkspaceResponse;
    login: ILoginResponse;

    /**
     * registerToTeam(email: String!, password: String!, teamId: String!): RegisterResponse!
     */
    registerToTeam: IRegisterResponse;
  }

  interface ICreateChannelOnMutationArguments {
    channelName: string;
    isPublic: boolean;
  }

  interface ICreateDirectMessageChannelOnMutationArguments {
    users: Array<IUsers | null>;
    channelName: string;
    isPublic: boolean;
  }

  interface ISendMessageOnMutationArguments {
    text: string;
    channelId: string;
  }

  interface ICreateTeamOnMutationArguments {
    name: string;
    isPublic: boolean;
  }

  interface ISigninWorkspaceOnMutationArguments {
    teamName: string;
  }

  interface ILoginOnMutationArguments {
    email: string;
    password: string;
  }

  interface IRegisterToTeamOnMutationArguments {
    email: string;
    password: string;
  }

  interface ICreateChannelResponse {
    __typename: 'CreateChannelResponse';
    approved: boolean | null;
    errors: Array<IError> | null;
  }

  interface IUsers {
    userId: string;
    username: string;
  }

  interface ICreateDirectMessageChannelResponse {
    __typename: 'createDirectMessageChannelResponse';
    approved: boolean | null;
    errors: Array<IError> | null;
  }

  interface ISendMessageResponse {
    __typename: 'SendMessageResponse';
    approved: boolean | null;
    errors: Array<IError> | null;
    message: IMessage | null;
  }

  interface ICreateTeamResponse {
    __typename: 'CreateTeamResponse';
    approved: boolean | null;
    errors: Array<IError> | null;
  }

  interface ISigninWorkspaceResponse {
    __typename: 'SigninWorkspaceResponse';
    team: ITeam | null;
    errors: Array<IError> | null;
  }

  interface ILoginResponse {
    __typename: 'LoginResponse';
    errors: Array<IError> | null;
    approved: boolean | null;
    user: IUser | null;
  }

  interface IRegisterResponse {
    __typename: 'RegisterResponse';
    errors: Array<IError> | null;
    approved: boolean | null;
  }

  interface ISubscription {
    __typename: 'Subscription';
    newMessage: IMessage;
  }
}

// tslint:enable
