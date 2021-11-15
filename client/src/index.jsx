import React from 'react';
import ReactDOM from 'react-dom';
import AlertMessage from './components/general/alert-message';
import { BarsProvider } from './components/bars/bars-context';
import Dialog from './components/dialog/dialog';
import NavBar from './components/bars/nav-bar';
import SideBar from './components/bars/side-bar';
import { AlertMessageProvider } from './contexts/alert-message-context';
import { DialogProvider } from './contexts/dialog-context';
import { ErrorProvider } from './contexts/error-context';
import { SessionProvider } from './contexts/session-context';
// import reportWebVitals from './reportWebVitals';
import { getSessionInfo } from './services/server/session-service';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeModeProvider } from './contexts/theme-context';
// import Tooltip from './components/tooltip';

let routingApp = null;
getSessionInfo()
  .then((sessionInfo) => {
    {/* <Tooltip></Tooltip> */}
    routingApp = (
      <ThemeModeProvider>
        <AlertMessageProvider>
          <AlertMessage></AlertMessage>
          <DialogProvider>
            <Dialog></Dialog>
            <ErrorProvider>
              <BrowserRouter>
                <SessionProvider>
                  <BarsProvider>
                    <NavBar title="Confiar" />
                    <SideBar icon="cart3"></SideBar>
                  </BarsProvider>
                  <App></App>
                </SessionProvider>
              </BrowserRouter>
            </ErrorProvider>
          </DialogProvider>
        </AlertMessageProvider>
      </ThemeModeProvider>
    );
  })
  .catch((error) => {
    routingApp = (
      <BrowserRouter>
        <App error={error} ></App>
      </BrowserRouter>
    );
  })
  .finally(() => {
    const routing = (
      <React.StrictMode>
        {routingApp}
      </React.StrictMode>
    );
    ReactDOM.render(routing, document.getElementById('root'));
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
// if (import.meta.hot) {
//   import.meta.hot.accept();
// }
