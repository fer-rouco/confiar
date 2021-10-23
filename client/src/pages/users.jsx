import { useHistory } from 'react-router';
import { useAlertMessage } from '../contexts/alert-message-context';
import { deleteUser, findUsers } from '../services/user-service';
import Panel from '../components/containers/panel';
import Table from '../components/table/table';
import { removeColumnDefinition, textColumnDefinition } from '../components/table/column-definitions/column-definition';

export default function Users() {
  const history = useHistory();
  const { addSuccessMessage, addErrorMessage } = useAlertMessage();

  const createUser = () => {
    history.push('/User');
  };

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
    removeColumnDefinition({
      key: 'remove',
      icon: 'trash-fill',
      dialogConfig: {
        title: 'Eliminar Usuario',
        message: 'Esta seguro que desea eliminar el usuario <%NAME%>?',
        onAccept: (model) => {
          return deleteUser(model.id)
            .then((user) => {
              addSuccessMessage(
                'El usuario ' + model.name + ' fue eliminado exitosamente.',
              );
            })
            .then((errorData) => {
              if (errorData) {
                addErrorMessage(errorData.message);
              }
            });
        }
      }
    })
  ];

  return (
    <Panel
      title='Usuarios.'
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
    </Panel>
  );
}
