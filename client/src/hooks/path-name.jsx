import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useReactPath = () => {
  const [path, setPath] = useState(window.location.pathname);
  const location = useLocation();

  useEffect(() => {
    setPath(window.location.pathname);
  }, [location]);

  return path;
};

export default useReactPath;
