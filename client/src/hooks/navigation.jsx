import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useError } from '../contexts/error-context';

const useNavigation = () => {
  const history = useHistory();
  const { cleanFieldError } = useError();

  const navigateTo = (to) => {
    history.push(to)
  };
  
  useEffect(() => {
    cleanFieldError();
  }, []);

  return {navigateTo};
};

export default useNavigation;
