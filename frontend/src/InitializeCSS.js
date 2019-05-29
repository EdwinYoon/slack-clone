import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  line-height: 1.2;
}
html  {
  min-height: 100%;
  max-width: 100%;
}
body {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
  background-color: #F9F9F9;
  background-size: cover;
}

#root {
  width: 100%;
  height: 100%;
}
`;
