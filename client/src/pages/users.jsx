import { useEffect, useState } from 'react';
import { useAlertMessage } from '../contexts/alert-message-context';
import useNavigation from '../hooks/navigation';
import { deleteUser, findUsers, getAllUserProfiles } from '../services/server/user-service';
import Panel from '../components/containers/panel';
import Table from '../components/table/table';
import { removeColumnDefinition, textColumnDefinition } from '../components/table/column-definitions/column-definition';

export default function Users() {
  const navigation = useNavigation();
  const { addSuccessMessage, addErrorMessage } = useAlertMessage();
  const [columnDefinitions, setColumnDefinitions] = useState([]);
  const [filterDefinitions, setFilterDefinitions] = useState([]);

  function createUser() {
    navigation.navigateTo('/User');
  };

  useEffect(() => {
    setColumnDefinitions([
      textColumnDefinition({ key: 'name', target: '/User' }),
      textColumnDefinition({ key: 'lastName' }),
      textColumnDefinition({ key: 'userName' }),
      textColumnDefinition({ key: 'mail' }),
      textColumnDefinition({ key: 'profile.description' }),
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
        textColumnDefinition({ key: 'name', target: '/User' }),
        textColumnDefinition({ key: 'lastName' }),
        textColumnDefinition({ key: 'userName' }),
        textColumnDefinition({ key: 'mail' }),
        {
          key: 'profile.id', 
          type: 'enum',
          options: profileListWithAllOption
        }
      ]);
    });
    
    return () => {
      setColumnDefinitions([]);
      setFilterDefinitions([]);
    };
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
