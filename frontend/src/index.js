import React, { Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import App from './routes/App';
import InitializeCSS from './InitializeCSS';
import theme from './components/common/theme';

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');

  // return the headers to the context so httpLink can read them
  const refreshToken = localStorage.getItem('refresh-token');

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'x-token': token !== null ? token : '',
      'x-refresh-token': refreshToken !== null ? refreshToken : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) graphQLErrors.forEach(({ message, locations, path }) => console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({
  uri: 'http://localhost:5000',
});

const cache = new InMemoryCache({});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, httpLink]),
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
