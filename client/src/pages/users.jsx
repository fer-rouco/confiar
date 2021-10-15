import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import AcceptCancelDialog from '../components/dialog/accept-cancel-dialog';
import { useAlertMessage } from '../contexts/alert-message-context';
import { deleteUser, findUsers } from '../services/user-service';
import Panel from '../components/panel';
import Table from '../components/table/table';
import { iconColumnDefinition, textColumnDefinition } from '../components/table/column-definitions/column-definition';

export default function Users() {
  const history = useHistory();
  const { addSuccessMessage, addErrorMessage } = useAlertMessage();
  const [showDialog, setShowDialog] = useState(false);
  const [dialogConfirmation, setDialogConfirmation] = useState(false);
  const [userToBeDeleted, setUserToBeDeleted] = useState(null);

  const getTitle = () => {
    return 'Usuarios.';
  };

  const createUser = () => {
    history.push('/User');
  };

  const deleteUserAlert = useCallback(() => {
    setShowDialog(true);
  }, [setShowDialog]);

  const removeUser = useCallback(
    (user) => {
      setUserToBeDeleted(user);
      deleteUserAlert();
    },
    [deleteUserAlert, setUserToBeDeleted],
  );

  const columnDefinitions = [
    textColumnDefinition({
      key: 'name',
      label: 'Nombre',
      target: '/User'
    }),
    textColumnDefinition({
      key: 'lastName',
      label: 'Apellido'
    }),
    textColumnDefinition({
      key: 'userName', 
      label: 'Usuario'
    }),
    textColumnDefinition({
      key: 'mail', 
      label: 'E-Mail'
    }),
    textColumnDefinition({
      key: 'profile.description', 
      label: 'Perfil'
    }),
    iconColumnDefinition({
      key: 'remove',
      icon: 'trash-fill',
      onClick: (rowObject) => removeUser(rowObject)
    })
  ];

  // const refreshTable = useCallback(() => {
  //   getAllUsers().then((userList) => {
  //     setUsers(userList);
  //   });
  // }, [location, removeUser]);

  // useEffect(() => {
  //   refreshTable();
  // }, [refreshTable]);

  useEffect(() => {
    if (dialogConfirmation) {
      setDialogConfirmation(false);
      if (userToBeDeleted) {
        const userName = userToBeDeleted.name;
        deleteUser(userToBeDeleted.id)
          .then((user) => {
            addSuccessMessage(
              'El usuario ' + userName + ' fue eliminado exitosamente.',
            );
            // refreshTable();
          })
          .then((errorData) => {
            if (errorData) {
              addErrorMessage(errorData.message);
            }
          });
      }
    }
  }, [
    dialogConfirmation,
    userToBeDeleted,
    // refreshTable,
    setDialogConfirmation,
    addSuccessMessage,
    addErrorMessage,
  ]);

  return (
    <Panel
      title={getTitle()}
      size="large"
      model={{}}
      actions={[
        {
          id: 'add',
          icon: 'plus',
          action: createUser,
          tooltip: 'Crear un usuario nuevo.',
        },
      ]}
    >
      <Table columnDefinitions={columnDefinitions} requestRowObjectsFunction={findUsers} ></Table>

      <AcceptCancelDialog
        title="Eliminar Usuario"
        message={
          'Esta seguro que desea eliminar el usuario ' +
          (userToBeDeleted ? userToBeDeleted.name : '') +
          '?'
        }
        show={showDialog}
        setShow={setShowDialog}
        setConfirmation={setDialogConfirmation}
      ></AcceptCancelDialog>
    </Panel>
  );
}
