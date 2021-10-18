import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Dialog from '../components/dialog/dialog';
import { yesNoDialogConfig } from '../components/dialog/dialog-config';
import { useAlertMessage } from '../contexts/alert-message-context';
import { deleteUser, findUsers } from '../services/user-service';
import Panel from '../components/panel';
import Table from '../components/table/table';
import { iconColumnDefinition, textColumnDefinition } from '../components/table/column-definitions/column-definition';

export default function Users() {
  const history = useHistory();
  const { addSuccessMessage, addErrorMessage } = useAlertMessage();
  const [showDialog, setShowDialog] = useState(false);
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

  const dialogConfig = yesNoDialogConfig({
    title: 'Eliminar Usuario',
    message: 'Esta seguro que desea eliminar el usuario ' + (userToBeDeleted ? userToBeDeleted.name : '') + '?',
    onAccept: () => {
      deleteUser(userToBeDeleted.id)
        .then((user) => {
          addSuccessMessage(
            'El usuario ' + userToBeDeleted.name + ' fue eliminado exitosamente.',
          );
          // refreshTable();
        })
        .then((errorData) => {
          if (errorData) {
            addErrorMessage(errorData.message);
          }
        });
    }
  });

  return (
    <Panel
      title={getTitle()}
      size="large"
      model={{}}
      actions={[
        {
          key: 'add',
          icon: 'plus',
          action: createUser,
          tooltip: 'Crear un usuario nuevo.',
        },
      ]}
    >
      <Table columnDefinitions={columnDefinitions} requestRowObjectsFunction={findUsers} ></Table>

      <Dialog config={dialogConfig} show={showDialog} setShow={setShowDialog} ></Dialog>
    </Panel>
  );
}
