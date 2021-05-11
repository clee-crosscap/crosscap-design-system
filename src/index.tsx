import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as styled from 'styled-components';
import * as ReactIntl from 'react-intl';
import * as ReactBootstrap from 'react-bootstrap';
import { enableMapSet } from 'immer';

import { store } from '@slices/store';
import BaseTheme from '@components/Theme/BaseTheme';
import RoutingComponent from '@components/RoutingComponent/RoutingComponent';
import { locale, messages } from '@utility/Intl.utility';

// import * as serviceWorker from './serviceWorker';

enableMapSet();

const GlobalStyle = styled.createGlobalStyle`
  body {
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
    font-family: 'Roboto', 'Arial', sans-serif;
  }
  html,
  body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }
  #root {
    width: 100%;
    height: 100%;
  }
  *, :after, :before {
    box-sizing: border-box;
  }
`;

const reactNamespacedPrefixes = [
  "tooltip",
  "dropdown",
  "dropdown-toggle",
  "dropdown-menu",
  "btn",
].reduce((a,b) => Object.assign(a, { [b]: `ccbs-${b}` }), {});


ReactDOM.render(
  <React.StrictMode>
    <ReactIntl.IntlProvider locale={locale} messages={messages} defaultLocale="en">
      <Provider store={store}>
        <GlobalStyle />
        <ReactBootstrap.ThemeProvider prefixes={reactNamespacedPrefixes}>
          <styled.ThemeProvider theme={BaseTheme}>
            <RoutingComponent />
          </styled.ThemeProvider>
        </ReactBootstrap.ThemeProvider>
      </Provider>
    </ReactIntl.IntlProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
