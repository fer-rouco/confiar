import React from 'react';

const AlertMessageContext = React.createContext(() => {});

export function AlertMessageProvider(props) {
  const [messageObject, setMessageObject] = React.useState({
    severity: 'info',
    message: '',
    icon: 'info-circle',
  });
  const value = React.useMemo(() => {
    const addMessage = (severity, message) => {
      let icon;
      switch (severity) {
        case 'info':
          icon = 'info-circle';
          break;
        case 'success':
          icon = 'check-circle';
          break;
        case 'danger':
          icon = 'exclamation-triangle';
          break;
        case 'warning':
          icon = 'exclamation-triangle';
          break;
        default:
          icon = 'info-circle';
          break;
      }
      setMessageObject({ severity: severity, message: message, icon: icon });
    };

    const addInfoMessage = (message) => {
      addMessage('info', message);
    };

    const addSuccessMessage = (message) => {
      addMessage('success', message);
    };

    const addErrorMessage = (message) => {
      addMessage('danger', message);
    };

    const addWarningMessage = (message) => {
      addMessage('warning', message);
    };

    const cleanMessage = () => {
      setMessageObject({ message: '' });
    };

    return {
      messageObject,
      cleanMessage,
      addMessage,
      addInfoMessage,
      addSuccessMessage,
      addWarningMessage,
      addErrorMessage,
    };
  }, [messageObject]);

  return <AlertMessageContext.Provider value={value} {...props} />;
}

export function useAlertMessage() {
  const context = React.useContext(AlertMessageContext);

  if (!context) {
    throw new Error(
      'useAlertMessage should be inside the provider AlertMessageContext',
    );
  }

  return context;
}
