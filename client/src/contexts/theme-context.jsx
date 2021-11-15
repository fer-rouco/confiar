import React from 'react';
import storageManagerService from "../services/storage/storage-manager-service";
import { lightTheme, darkTheme} from './../theme';

const ThemeContext = React.createContext(() => {});

export function ThemeModeProvider(props) {
  const localStorageService = storageManagerService();
  const themeModeStored = localStorageService.getItem("theme.mode");
  let darkMode = (themeModeStored) ? themeModeStored.dark : false;
  const [darkThemeState, setDarkThemeState] = React.useState(darkMode);

  const toggle = () => {
    localStorageService.setItem("theme.mode", { dark: !darkThemeState });
    setDarkThemeState(!darkThemeState);
  }

  const isDark = () => {
    return darkThemeState;
  }

  const getCurrent = () => {
    return isDark() ? darkTheme : lightTheme
  }

  // const toString = () => {
  //   return (darkTheme) ? 'dark' : 'light';
  // }

  // const getClass = (prefix, noLight) => {
  //   return (!noLight || (noLight && darkTheme)) ? prefix + '-' + toString() : '';
  // }

  // const getBackgroundClass = (noLight) => {
  //   return getClass('bg', noLight);
  // }

  // const getTextClass = (noLight) => {
  //   return getClass('text', noLight);
  // }
  
  // const getNavbarClass = (noLight) => {
  //   return getClass('navbar', noLight);
  // }

  const toString = (invert) => {
    return ((!invert && darkThemeState) || (invert && !darkThemeState)) ? 'dark' : 'light';
  }

  const getClass = (prefix, invert) => {
    return prefix + '-' + toString(invert);
  }

  const getBackgroundClass = (invert) => {
    return getClass('bg', invert);
  }

  const getTextClass = (invert) => {
    return getClass('text', invert);
  }
  
  const getNavbarClass = (invert) => {
    return getClass('navbar', invert);
  }

  const value = React.useMemo(() => {
    return {
      toggle,
      isDark,
      toString,
      getCurrent,
      getBackgroundClass,
      getTextClass,
      getNavbarClass
    };
  }, [darkThemeState]);

  return <ThemeContext.Provider value={value} {...props} />;
}

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Theme('useTheme should be inside the provider ThemeContext');
  }

  return context;
}
