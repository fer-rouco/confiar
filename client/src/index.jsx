import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeModeProvider } from './contexts/theme-context';
// import reportWebVitals from './reportWebVitals';
import { getSessionInfo } from './services/server/session-service';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translation_en from './resources/locales/translation_en.json'
import translation_es from './resources/locales/translation_es.json'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: translation_en,
      es: translation_es
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });
  
let routingApp = null;
getSessionInfo()
  .then((sessionInfo) => {
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
