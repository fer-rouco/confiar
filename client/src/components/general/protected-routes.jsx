import { useEffect } from 'react';
import i18next from "i18next";
import { validateSession } from './../../services/server/session-service';
import { getCurrentSession } from './../../services/server/session-service';
import configData from './../../config.json';

const withAuth = (WrappedComponent) => {
  return function ProtectedRoutes(props) {
    const navigationTranslation = i18next.getFixedT(null, 'routes');

    useEffect(() => {
      const session = getCurrentSession();
      if (!configData.DEVELOP_MODE) {
        if (!session) {
          props.history.push(navigationTranslation('login'));
        }
        else {
          validateSession(session.token).then((result) => {
            // console.log("Valid session token: " + result.token);
          })
          .catch((error) => {
            props.history.push(navigationTranslation('login'));
          });
        }
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
