import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeModeProvider } from './contexts/theme-context';
// import reportWebVitals from './reportWebVitals';
import { getSessionInfo } from './services/server/session-service';
import './i18n';

const container = document.getElementById('root');
let routingApp = null;
getSessionInfo()
  .then(() => {
    routingApp = (
      <App></App>
    );
  })
  .catch((error) => {
    routingApp = (
      <App error={error} ></App>
    );
  })
  .finally(() => {
    const routing = (
      <React.StrictMode>
        <ThemeModeProvider>
          <BrowserRouter>
            {routingApp}
          </BrowserRouter>
        </ThemeModeProvider>
      </React.StrictMode>
    );
    const root = createRoot(container);
    root.render(routing);
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
