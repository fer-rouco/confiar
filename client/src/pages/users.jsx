import { useEffect, useState } from 'react';
import useNavigation from '../hooks/navigation';
import { deleteUser, findUsers, getAllUserProfiles } from '../services/server/user-service';
import withPage from "../components/containers/page";
import Panel from '../components/containers/panel';
import Table from '../components/table/table';
import { textColumnDefinition, enumColumnDefinition, removeColumnDefinition } from '../components/table/column-definitions/column-definition';
import { addIconAction } from '../components/controls/action-definition';

function Users() {
  const navigation = useNavigation();
  const [columnDefinitions, setColumnDefinitions] = useState([]);
  const [filterDefinitions, setFilterDefinitions] = useState([]);

  function createUser() {
    navigation.navigateToId('user');
  };

  useEffect(() => {
    setColumnDefinitions([
      textColumnDefinition({ key: 'name', target: '/User' }),
      textColumnDefinition({ key: 'lastName' }),
      textColumnDefinition({ key: 'userName' }),
      textColumnDefinition({ key: 'mail' }),
      textColumnDefinition({ key: 'profile.description' }),
      removeColumnDefinition({
        dialogDefinition: {
          onAccept: (model) => { return deleteUser(model.id); }
        }
      })
    ]);

    getAllUserProfiles().then(response => {
      let profileList = response.map((profile) => { return {value: profile.id, label: profile.description }; });
      // TODO: Translate
      let profileListWithAllOption = [{value: '', label: 'Todos' }, ...profileList];
      
      setFilterDefinitions([
        textColumnDefinition({ key: 'name', target: '/User' }),
        textColumnDefinition({ key: 'lastName' }),
        textColumnDefinition({ key: 'userName' }),
        textColumnDefinition({ key: 'mail' }),
        enumColumnDefinition({ key: 'profile.id', options: profileListWithAllOption })
      ]);
    });
    
    return () => {
      setColumnDefinitions([]);
      setFilterDefinitions([]);
    };
  }, []);

  return (
    <Panel size="large" model={{}} actions={[addIconAction(createUser)]} >
      <Table requestRowObjectsFunction={findUsers} columnDefinitions={columnDefinitions} filterDefinitions={filterDefinitions} ></Table>
    </Panel>
  );
}

export default withPage("users")(Users);
