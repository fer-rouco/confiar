import React from 'react';

const ModelContext = React.createContext(() => {});

export function ModelProvider(props) {
  const [model, setModel] = React.useState(props.model);

  React.useEffect(() => {
    setModel(props.model);
  }, [props.model]);

  const value = React.useMemo(() => {
    function set(attr, value) {
      if (model) {
        model[attr] = value;
      }
    }

    function get(attr) {
      return model ? model[attr] : undefined;
    }

    return {
      set,
      get,
    };
  }, [model]);

  return <ModelContext.Provider value={value} {...props} />;
}

export function useModel() {
  const context = React.useContext(ModelContext);

  if (!context) {
    throw new Error('useModel should be inside the provider ModelContext');
  }

  return context;
}
