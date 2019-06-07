// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
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
    hello: string;
  }

  interface IHelloOnQueryArguments {
    name?: string | null;
  }

  interface IMutation {
    __typename: 'Mutation';
    createTeam: ICreateTeamResponse;
    login: ILoginResponse;
    register: IRegisterResponse;
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
    username: string;
  }

  interface ICreateTeamResponse {
    __typename: 'CreateTeamResponse';
    approved: boolean | null;
    errors: Array<IError> | null;
  }

  interface IError {
    __typename: 'Error';
    path: string;
    message: string;
  }

  interface ILoginResponse {
    __typename: 'LoginResponse';
    errors: Array<IError> | null;
    approved: boolean | null;
  }

  interface IRegisterResponse {
    __typename: 'RegisterResponse';
    errors: Array<IError> | null;
    approved: boolean | null;
  }
}

// tslint:enable
