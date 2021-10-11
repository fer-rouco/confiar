import { useEffect } from 'react';
import { getSessionStorageObject } from '../services/session-storage-service';
import configData from './../config.json';

const withAuth = (WrappedComponent) => {
  return function ProtectedRoutes(props) {
    useEffect(() => {
      const session = getSessionStorageObject('session');
      if (!configData.DEVELOP_MODE && !session) {
        props.history.push('/login');
      }
    });

    return (
      <div>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default withAuth;
