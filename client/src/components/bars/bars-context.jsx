import React, { useState } from 'react';

const BarsContext = React.createContext(() => {});

export function BarsProvider(props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const value = React.useMemo(() => {
    return {
      sidebarOpen,
      setSidebarOpen,
    };
  }, [sidebarOpen]);

  return <BarsContext.Provider value={value} {...props} />;
}

export function useBars() {
  const context = React.useContext(BarsContext);

  if (!context) {
    throw new Error('useError should be inside the provider BarsContext');
  }

  return context;
}
