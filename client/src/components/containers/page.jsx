import { PageProvider } from '../../contexts/page-context';
import { DialogProvider } from '../../contexts/dialog-context';
import { ErrorProvider } from '../../contexts/error-context';
import Dialog from '../dialog/dialog';

const withPage = (pageId) => (WrappedComponent) => {
  return function LoadIndicator(props) {
    return (
      <PageProvider id={pageId}>
        <ErrorProvider>
          <DialogProvider>
            <div className="page" >
              <WrappedComponent {...props}></WrappedComponent>
            </div>
            <Dialog></Dialog>
          </DialogProvider>
        </ErrorProvider>
      </PageProvider>
    );
  };
};

export default withPage;
