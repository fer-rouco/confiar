import { useEffect } from 'react';
import useRoutesResolver from './../../hooks/routes-resolver';
import { validateSession } from './../../services/server/session-service';
import { getCurrentSession } from './../../services/server/session-service';
import configData from './../../config.json';

const withAuth = (WrappedComponent) => {
  return function ProtectedRoutes(props) {
    const routesResolver = useRoutesResolver();

    useEffect(() => {
      const session = getCurrentSession();
      if (!configData.DEVELOP_MODE) {
        if (!session) {
          props.history.push(routesResolver.get('login'));
        }
        else {
          validateSession(session.token).then((result) => {
            // console.log("Valid session token: " + result.token);
          })
          .catch((error) => {
            props.history.push(routesResolver.get('login'));
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
