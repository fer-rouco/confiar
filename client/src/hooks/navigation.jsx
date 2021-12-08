import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useError } from '../contexts/error-context';
import i18next from "i18next";

const useNavigation = () => {
  const history = useHistory();
  const navigationTranslation = i18next.getFixedT(null, 'routes');
  const { cleanFieldError } = useError();

  const navigateToId = (id) => {
    history.push(navigationTranslation(id));
  };
  
  useEffect(() => {
    cleanFieldError();
  }, []);

  return {navigateToId};
};

export default useNavigation;
