import { actionAccept, actionCancel, actionNo, actionYes } from './action';
import Dialog from './dialog';

export default function AcceptCancelDialog(props) {
  const actionAccept = (props.proper) ? actionAccept() : actionYes();
  const actionCancel = (props.proper) ? actionCancel() : actionNo();
  const actions = [actionCancel, actionAccept];

  actionAccept.action = () => {
    props.setConfirmation(true);
    props.setShow(false);
  };

  actionCancel.action = () => {
    props.setConfirmation(false);
    props.setShow(false);
  };

  return (
    <Dialog
      {...props}
      actions={actions}
    ></Dialog>
  );
}
