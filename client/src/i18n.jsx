import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from './resources/locales/translation_en.json'
import translationES from './resources/locales/translation_es.json'
import { STORAGE_LANGUAGE } from "./services/storage/storage-constants";
import storageManagerService from "./services/storage/storage-manager-service";

const localStorageService = storageManagerService();
let languageInStorage = localStorageService.getItem(STORAGE_LANGUAGE);
if (!languageInStorage) {
  languageInStorage = "en"
  localStorageService.setItem(STORAGE_LANGUAGE, languageInStorage);
} 

// the translations
const resources = {
  // en: { translation: translationEN },
  // es: { translation: translationES }

  en: translationEN,
  es: translationES

};


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: resources,
    // lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: languageInStorage,
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

  // catch the event and make changes accordingly
// i18next.on('languageChanged', function(lng) {
//   // E.g. set the moment locale with the current language
//   // moment.locale(lng);

//   // then re-render your app
//   // app.render();
//   ReactDOM.render(routing, document.getElementById('root'));
// });
export default i18n;