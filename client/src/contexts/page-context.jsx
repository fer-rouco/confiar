import React from 'react';
import { useTranslation as useTranslationI18Next } from 'react-i18next';

const PageContext = React.createContext(() => {});

export function PageProvider(props) {
  let { t, i18n } = useTranslationI18Next('pages', { keyPrefix: props.id } );

  return <PageContext.Provider value={{id: props.id, translation: t, i18n}} {...props} />;
}

export function usePage() {
  const context = React.useContext(PageContext);

  if (!context) {
    throw new Error('usePage should be inside the provider PageContext');
  }

  return context;
}
