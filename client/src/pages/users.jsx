import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useAlertMessage } from '../contexts/alert-message-context';
import { deleteUser, findUsers, getAllUserProfiles } from '../services/user-service';
import Panel from '../components/containers/panel';
import Table from '../components/table/table';
import { removeColumnDefinition, textColumnDefinition } from '../components/table/column-definitions/column-definition';

export default function Users() {
  const history = useHistory();
  const { addSuccessMessage, addErrorMessage } = useAlertMessage();
  const [columnDefinitions, setColumnDefinitions] = useState([]);
  const [filterDefinitions, setFilterDefinitions] = useState([]);

  function createUser() {
    history.push('/User');
  };

  useEffect(() => {
    setColumnDefinitions([
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
    ]);

    getAllUserProfiles().then(response => {
      let profileList = response.map((profile) => { return {value: profile.id, label: profile.description }; });
      let profileListWithAllOption = [{value: '', label: 'Todos' }, ...profileList];
      
      setFilterDefinitions([
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
        {
          key: 'profile.id', 
          type: 'enum',
          label: 'Perfil',
          options: profileListWithAllOption
        }
      ]);
    });  
  }, []);

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
      <Table columnDefinitions={columnDefinitions} requestRowObjectsFunction={findUsers} filterDefinitions={filterDefinitions} ></Table>
    </Panel>
  );
}
