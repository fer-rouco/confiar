import { createContext, useContext, useMemo, useState } from 'react';

const DialogContext = createContext(() => {});

export function DialogProvider(props) {
  const [showDialogState, setShowDialogState] = useState(false);
  const [afterConfirmation, setAfterConfirmation] = useState(false);
  const [dialogDefinition, setDialogDefinition] = useState({});
  const [modelState, setModelState] = useState({});
  const [translationPrefixKey, setTranslationPrefixKey] = useState('');

  const showDialog = (localModel) => {
    if (localModel) {
      setModelState(localModel);
    }
    setShowDialogState(true);
  }

  const hideDialog = () => {
    setShowDialogState(false);
  }

  const getDialogVisibility = () => {
    return showDialogState;
  }

  const setDefinition = (config) => {
    setDialogDefinition(config);
  }

  const getDefinition = () => {
    return dialogDefinition;
  }

  const setModel = (localModel) => {
    setModelState(localModel);
  }

  const getModel = () => {
    return modelState;
  }

  const getAfterConfirmationFlag = () => {
    return afterConfirmation;
  }

  const setAfterConfirmationFlag = (afterConfirmationFlag) => {
    setAfterConfirmation(afterConfirmationFlag);
  }

  const getTranslationPrefixKey = () => {
    return translationPrefixKey;
  }
    
  const value = useMemo(() => {
    return {
      showDialog,
      hideDialog,
      getDialogVisibility,
      setDefinition,
      getDefinition,
      setModel,
      getModel,
      setAfterConfirmationFlag,
      getAfterConfirmationFlag,
      getTranslationPrefixKey,
      setTranslationPrefixKey
    };
  }, [showDialogState, dialogDefinition, modelState, afterConfirmation, translationPrefixKey]);

  return <DialogContext.Provider value={value} {...props} />;
}

export function useDialog() {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('useDialog should be inside the provider DialogContext');
  }

  return context;
}
