import { createContext, useContext, useMemo, useState } from 'react';

const DialogContext = createContext(() => {});

export function DialogProvider(props) {
  const [showDialogState, setShowDialogState] = useState(false);
  const [actionExecutedState, setActionExecutedState] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({});
  const [modelState, setModelState] = useState({});

  const showDialog = (localModel) => {
    if (localModel) {
      setModelState(localModel);
    }
    setShowDialogState(true);
  }

  const hideDialog = () => {
    setShowDialogState(false);
  }

  const shouldShowDialog = () => {
    return showDialogState;
  }

  const setConfig = (config) => {
    setDialogConfig(config);
  }

  const getConfig = () => {
    return dialogConfig;
  }

  const setModel = (localModel) => {
    setModelState(localModel);
  }

  const getModel = () => {
    return modelState;
  }

  const getActionExecuted = () => {
    return actionExecutedState;
  }

  const setActionExecuted = (actionExecutedParam) => {
    setActionExecutedState(actionExecutedParam);
  }
    
  const value = useMemo(() => {
    return {
      showDialog,
      hideDialog,
      shouldShowDialog,
      setConfig,
      getConfig,
      setModel,
      getModel,
      setActionExecuted,
      getActionExecuted
    };
  }, [showDialogState, dialogConfig, modelState, actionExecutedState]);

  return <DialogContext.Provider value={value} {...props} />;
}

export function useDialog() {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('useDialog should be inside the provider DialogContext');
  }

  return context;
}
