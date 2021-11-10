import { useEffect } from 'react';
import { getSession } from '../../services/storage/session-storage-service';
import configData from './../../config.json';

const withAuth = (WrappedComponent) => {
  return function ProtectedRoutes(props) {
    useEffect(() => {
      const session = getSession();
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
