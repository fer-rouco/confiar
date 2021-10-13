import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const useReactPath = () => {
  const [path, setPath] = useState(window.location.pathname);
  const history = useHistory();

  const listenToPopstate = () => {
    const winPath = window.location.pathname;
    setPath(winPath);
  };

  useEffect(() => {
    history.listen((location, action) => {
      listenToPopstate();
    });

    return () => {
      if (history.unlisten) {
        history.unlisten();
      }
    };
  }, [history]);

  return path;
};

export default useReactPath;
