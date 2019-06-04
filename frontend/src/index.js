import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './routes/App';
import InitializeCSS from './InitializeCSS';
import theme from './components/common/theme';

render(
  <ThemeProvider theme={theme}>
    <Fragment>
      <InitializeCSS />
      <App />
    </Fragment>
  </ThemeProvider>,
  document.querySelector('#root'),
);
