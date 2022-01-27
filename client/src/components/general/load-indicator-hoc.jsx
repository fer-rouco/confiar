/* Method that checks whether a props is empty 
prop can be an object, string or an array */
import LoadIndicator from './load-indicator';

const isLoading = (props) =>
  props && props[0] && props[0].loading;

const withLoader = (loadingProp) => (WrappedComponent) => {
  return (props) => {
    return isLoading(props[loadingProp]) ? (
      <WrappedComponent {...props}>
        <LoadIndicator></LoadIndicator>
      </WrappedComponent>
    ) : (
      <WrappedComponent {...props}></WrappedComponent>
    );
  };
};

export default withLoader;
