import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useRoutesResolver from './../../hooks/routes-resolver';
import { validateSession } from './../../services/server/session-service';
import { getCurrentSession } from './../../services/server/session-service';
import configData from './../../config.json';

const withAuth = (WrappedComponent) => {
  return function ProtectedRoutes(props) {
    const routesResolver = useRoutesResolver();
    const navigate = useNavigate();

    useEffect(() => {
      const session = getCurrentSession();
      if (!configData.DEVELOP_MODE) {
        if (!session) {
          navigate(routesResolver.getUrl('logIn'));
        }
        else {
          validateSession(session.token).then((result) => {
            // console.log("Valid session token: " + result.token);
          })
          .catch((error) => {
            navigate(routesResolver.getUrl('logIn'));
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
