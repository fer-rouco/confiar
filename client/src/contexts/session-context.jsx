// React context Tutorial
// https://www.youtube.com/watch?v=gigKP6PPmW0

import React from 'react';
import { useAlertMessage } from './alert-message-context';
import useNavigation from '../hooks/navigation';
import { useError } from './error-context';
import {
  logIn as logInCall,
  logOut as logOutCall,
} from './../services/server/session-service';
import storageManagerService from "./../services/storage/storage-manager-service";
import { STORAGE_SESSION_IDENTIFIER } from './../services/storage/storage-constants';

const SessionContext = React.createContext(() => {});

export function SessionProvider(props) {
  const sessionStorageService = storageManagerService(true);
  const { addFieldError } = useError();
  const { addSuccessMessage, addErrorMessage } = useAlertMessage();
  const [sessionState, setSessionState] = React.useState(
    sessionStorageService.getItem(STORAGE_SESSION_IDENTIFIER)
  );
  const navigation = useNavigation();

  const value = React.useMemo(() => {
    const logIn = async function (user, password) {
      logInCall(user, password)
        .then((session) => {
          sessionStorageService.setItem(STORAGE_SESSION_IDENTIFIER, session);
          setSessionState(session);
          addSuccessMessage('Te logueaste exitosamente!');
          navigation.navigateTo('/Customers');
          return session;
        })
        .catch((error) => {
          addFieldError(error.field, error.message);
          addErrorMessage(error.message);
          return error;
        });
    };

    const logOut = () => {
      logOutCall()
        .then((session) => {
          sessionStorageService.removeItem(STORAGE_SESSION_IDENTIFIER);
          setSessionState(session);
          addSuccessMessage('Te deslogueaste exitosamente!');
          navigation.navigateTo('/Login');
          return session;
        })
        .catch((error) => {
          addFieldError(error.field, error.message);
          addErrorMessage(error.message);
          return error;
        });
    };

    return {
      session: sessionState,
      logIn,
      logOut,
    };
  }, [
    sessionState,
    addErrorMessage,
    addFieldError,
    addSuccessMessage,
    history,
  ]);

  return <SessionContext.Provider value={value} {...props} />;
}

export function useSession() {
  const context = React.useContext(SessionContext);

  if (!context) {
    throw new Error('useSession should be inside the provider SessionContext');
  }

  return context;
}
