import { DialogProvider } from '../../contexts/dialog-context';
import { PageProvider } from '../../contexts/page-context';
import Dialog from '../dialog/dialog';

export default function Page(props) {
  return (
    <PageProvider id={props.id}>
      <DialogProvider>
        <div className="page" >
          {props.children}
        </div>
        <Dialog></Dialog>
      </DialogProvider>
    </PageProvider>
  );
}
