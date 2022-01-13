import React from 'react';
import { useTranslation } from 'react-i18next';

const PageNotFound = () => {
  const { t } = useTranslation('generic', { keyPrefix: 'page' });

  return (
    <>
      <h1>{t("notFound")}</h1>
    </>
  )
};
export default PageNotFound;
