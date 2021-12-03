import { createContext, useContext, useMemo, useState } from 'react';

const DialogContext = createContext(() => {});

export function DialogProvider(props) {
  const [showDialogState, setShowDialogState] = useState(false);
  const [afterConfirmationFlagState, setAfterConfirmationFlagState] = useState(false);
  const [afterConfirmationErrorState, setAfterConfirmationErrorState] = useState(null);
  const [dialogDefinition, setDialogDefinition] = useState({});
  const [modelState, setModelState] = useState({});
  const [translationPrefixKey, setTranslationPrefixKey] = useState('');
  const [translationActionKey, setTranslationActionKey] = useState('');

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

  const getAfterConfirmation = () => {
    return afterConfirmationFlagState;
  }

  const setAfterConfirmation = (afterConfirmationFlag) => {
    setAfterConfirmationFlagState(afterConfirmationFlag);
  }

  const getAfterConfirmationError = () => {
    return afterConfirmationErrorState;
  }

  const setAfterConfirmationError = (afterConfirmationError) => {
    setAfterConfirmationErrorState(afterConfirmationError);
  }

  const getTranslationPrefixKey = () => {
    return translationPrefixKey;
  }
    
  const getTranslationActionKey = () => {
    return translationActionKey;
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
      setAfterConfirmation,
      getAfterConfirmation,
      setAfterConfirmationError,
      getAfterConfirmationError,
      getTranslationPrefixKey,
      setTranslationPrefixKey,
      getTranslationActionKey,
      setTranslationActionKey
    };
  }, [showDialogState, dialogDefinition, modelState, afterConfirmationFlagState, afterConfirmationErrorState, translationPrefixKey]);

  return <DialogContext.Provider value={value} {...props} />;
}

export function useDialog() {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('useDialog should be inside the provider DialogContext');
  }

  return context;
}
