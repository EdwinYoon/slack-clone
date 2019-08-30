import React, { Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { setContext } from 'apollo-link-context';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { getMainDefinition } from 'apollo-utilities';

import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import App from './routes/App';
import InitializeCSS from './InitializeCSS';
import theme from './components/common/theme';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) graphQLErrors.forEach(({ message, locations, path }) => console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({
  uri: 'http://localhost:5000',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:5000/',
  options: {
    reconnect: true,
    // lazy: true,
  },
});

const cache = new InMemoryCache({});

const terminatingLink = split(
  ({ query: { definitions } }) => definitions.some((node) => {
    const { kind, operation } = node;
    return kind === 'OperationDefinition' && operation === 'subscription';
  }),
  wsLink,
  httpLink,
);

const link = ApolloLink.from([errorLink, terminatingLink]);

const client = new ApolloClient({
  link,
  cache,
});

render(
  <ThemeProvider theme={theme}>
    <Fragment>
      <InitializeCSS />
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <App />
        </ApolloHooksProvider>
      </ApolloProvider>
    </Fragment>
  </ThemeProvider>,
  document.querySelector('#root'),
);
