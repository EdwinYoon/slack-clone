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
    channels: Array<IChannel | null>;
    messages: Array<IMessage | null>;
    getTeamByName: IGetTeamByNameResponse;
    hello: string;
  }

  interface IChannelsOnQueryArguments {
    teamName: string;
  }

  interface IMessagesOnQueryArguments {
    channelId: string;
  }

  interface IGetTeamByNameOnQueryArguments {
    name: string;
  }

  interface IHelloOnQueryArguments {
    name?: string | null;
  }

  interface IChannel {
    __typename: 'Channel';
    id: string;
    name: string;
    isPublic: boolean;
    team: string;
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

  interface IGetTeamByNameResponse {
    __typename: 'GetTeamByNameResponse';
    id: string | null;
    name: string | null;
    errors: Array<IError> | null;
  }

  interface IError {
    __typename: 'Error';
    path: string;
    message: string;
  }

  interface IMutation {
    __typename: 'Mutation';
    createChannel: ICreateChannelResponse;
    sendMessage: ISendMessageResponse;
    createTeam: ICreateTeamResponse;
    login: ILoginResponse;
    register: IRegisterResponse;
  }

  interface ICreateChannelOnMutationArguments {
    channelName: string;
    teamName: string;
    isPublic: boolean;
  }

  interface ISendMessageOnMutationArguments {
    text: string;
    userId: string;
    teamId: string;
    channelId: string;
  }

  interface ICreateTeamOnMutationArguments {
    name: string;
  }

  interface ILoginOnMutationArguments {
    email: string;
    password: string;
  }

  interface IRegisterOnMutationArguments {
    email: string;
    password: string;
  }

  interface ICreateChannelResponse {
    __typename: 'CreateChannelResponse';
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
