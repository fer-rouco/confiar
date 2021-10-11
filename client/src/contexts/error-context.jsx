import React from 'react';

const ErrorContext = React.createContext(() => {});

export function ErrorProvider(props) {
  const [fieldError, setFieldError] = React.useState({
    field: null,
    message: '',
  });

  function addFieldError(field, message) {
    setFieldError({ field: field, message: message });
  }

  function cleanFieldError() {
    setFieldError({ field: null, message: '' });
  }

  const value = React.useMemo(() => {
    return {
      fieldError: fieldError,
      cleanFieldError,
      addFieldError,
    };
  }, [fieldError]);

  return <ErrorContext.Provider value={value} {...props} />;
}

export function useError() {
  const context = React.useContext(ErrorContext);

  if (!context) {
    throw new Error('useError should be inside the provider ErrorContext');
  }

  return context;
}
