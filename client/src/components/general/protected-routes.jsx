import { useEffect } from 'react';
import storageManagerService from "./../../services/storage/storage-manager-service";
import { STORAGE_SESSION_IDENTIFIER } from '../../services/storage/storage-constants';
import configData from './../../config.json';

const withAuth = (WrappedComponent) => {
  return function ProtectedRoutes(props) {
    useEffect(() => {
      const session = storageManagerService(true).getItem(STORAGE_SESSION_IDENTIFIER);
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
