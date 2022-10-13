import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useError } from '../contexts/error-context';
import useRoutesResolver from './routes-resolver';

const useNavigation = () => {
  const navigate = useNavigate();
  const { cleanFieldError } = useError();
  const routesResolver = useRoutesResolver();

  const navigateToId = (id) => {
    navigate(routesResolver.getUrl(id));
  };
  
  useEffect(() => {
    cleanFieldError();
  }, []);

  return {navigateToId};
};

export default useNavigation;
