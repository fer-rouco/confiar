import React from 'react';
import { useTranslation as useTranslationI18Next } from 'react-i18next';

const PageContext = React.createContext(() => {});

export function PageProvider(props) {
  let { t, i18n } = useTranslationI18Next('pages', { keyPrefix: props.id } );

  function translate(key, placeholders) {
    let translation;
    let translationResult = (t) ? t(key, placeholders) : "";
    if (!translationResult.endsWith(key)) {
      translation = translationResult;
    }
    return translation;
  }

  function getTranslation(translationObject, prefix, model) {
    let placeholders = {};
    if (translationObject.placeholders) {
      Object.values(translationObject.placeholders).forEach((placeholder) => {
        let modelEntries = Object.entries(model).filter((entry) => { 
          return entry[0].toLowerCase() === placeholder.toLowerCase();
        });
        if (modelEntries && modelEntries.length > 0) {
          modelEntries.forEach((modelEntry) => {
            placeholders[modelEntry[0]] = modelEntry[1];
          });
        }
      });
    }
    return translate(((prefix) ? prefix : "") + translationObject.key, placeholders);
  }

  function resolveTranslation(translationObject, prefix, model) {
    let message;
    if (translationObject) {
      if (translationObject.hasOwnProperty('key')) {
        message = getTranslation(translationObject, prefix, model);
      }
      else if (typeof translationObject === 'string') {
        message = translationObject;
      }
      return message;
    }
  }

  return <PageContext.Provider value={{id: props.id, i18n, translation: translate, getTranslation, resolveTranslation}} {...props} />;
}

export function usePage() {
  const context = React.useContext(PageContext);

  if (!context) {
    throw new Error('usePage should be inside the provider PageContext');
  }

  return context;
}
