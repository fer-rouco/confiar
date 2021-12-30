import React, { useState } from 'react';

const ModelContext = React.createContext(() => {});

export function ModelProvider(props) {
  const modelState = (props.model) ? props.model : useState(null);

  return <ModelContext.Provider value={modelState} {...props} />;
}

export function useModel() {
  const context = React.useContext(ModelContext);

  if (!context) {
    throw new Error('useModel should be inside the provider ModelContext');
  }

  return context;
}

export function createModel(modelObjectParam) {
  let modelObject = { loading: true };
  modelObject = (modelObjectParam) ? { ...modelObject, ...modelObjectParam } : modelObject;
  return useState(modelObject);
}

export function updateModel(modelState, loading) {
  const [model, setModel] = modelState;

  setModel({ ...model, loading: ((loading) ? loading : false) });
}