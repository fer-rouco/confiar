import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useError } from '../contexts/error-context';
import useRoutesResolver from './routes-resolver';

const useNavigation = () => {
  const history = useHistory();
  const { cleanFieldError } = useError();
  const routesResolver = useRoutesResolver();

  const navigateToId = (id) => {
    history.push(routesResolver.getUrl(id));
  };
  
  useEffect(() => {
    cleanFieldError();
  }, []);

  return {navigateToId};
};

export default useNavigation;
