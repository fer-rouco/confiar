// React context Tutorial
// https://www.youtube.com/watch?v=gigKP6PPmW0

import React from 'react';
import { useAlertMessage } from './alert-message-context';
import { useHistory } from 'react-router';
import { useError } from './error-context';
import {
  logIn as logInCall,
  logOut as logOutCall,
} from '../services/server/session-service';
import {
  getSession,
  setSession,
  destroySession,
} from '../services/storage/session-storage-service';

const SessionContext = React.createContext(() => {});

export function SessionProvider(props) {
  const { addFieldError, cleanFieldError } = useError();
  const { addSuccessMessage, addErrorMessage } = useAlertMessage();
  const [sessionState, setSessionState] = React.useState(
    getSession(),
  );
  const history = useHistory();

  const value = React.useMemo(() => {
    const logIn = async function (user, password) {
      cleanFieldError();

      logInCall(user, password)
        .then((session) => {
          setSession(session);
          setSessionState(session);
          addSuccessMessage('Te logueaste exitosamente!');
          history.push('/Customers');
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
          destroySession();
          setSessionState(session);
          addSuccessMessage('Te deslogueaste exitosamente!');
          history.push('/Login');
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
    cleanFieldError,
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
