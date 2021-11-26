import { DialogProvider } from '../../contexts/dialog-context';
import { PageProvider } from '../../contexts/page-context';
import Dialog from '../dialog/dialog';

const withPage = (pageId) => (WrappedComponent) => {
  return function LoadIndicator(props) {
    return (
      <PageProvider id={pageId}>
        <DialogProvider>
          <div className="page" >
            <WrappedComponent {...props}></WrappedComponent>
          </div>
          <Dialog></Dialog>
        </DialogProvider>
      </PageProvider>
    );
  };
};

export default withPage;
