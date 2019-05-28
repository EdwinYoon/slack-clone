import React, { Fragment } from 'react';
import { render } from 'react-dom';
import App from './routes/App';
import InitializeCSS from './InitializeCSS';

render(
  <Fragment>
    <InitializeCSS />
    <App />
  </Fragment>,
  document.querySelector('#root'),
);
