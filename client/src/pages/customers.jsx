import { useEffect, useState } from 'react';
import useNavigation from '../hooks/navigation';
import { removeCustomer, findCustomers } from '../services/server/customer-service';
import Panel from '../components/containers/panel';
import Table from '../components/table/table';
import { removeColumnDefinition, textColumnDefinition } from '../components/table/column-definitions/column-definition';
import withPage from '../components/containers/page';
import { addIconAction } from '../components/controls/action-definition';

function Customers() {
  const navigation = useNavigation();
  const [columnDefinitions, setColumnDefinitions] = useState([]);
  const [filterDefinitions, setFilterDefinitions] = useState([]);

  function create() {
    navigation.navigateTo('/Customer');
  };

  useEffect(() => {
    setColumnDefinitions([
      textColumnDefinition({ key: 'name', target: '/Customer' }),
      textColumnDefinition({ key: 'lastName' }),
      textColumnDefinition({ key: 'mail' }),
      removeColumnDefinition({
        dialogDefinition: {
          onAccept: (model) => { return removeCustomer(model.id); }
        }
      })
    ]);

    setFilterDefinitions([
      textColumnDefinition({ key: 'name', target: '/User' }),
      textColumnDefinition({ key: 'lastName' }),
      textColumnDefinition({ key: 'mail' })
    ]);
        
    return () => {
      setColumnDefinitions([]);
      setFilterDefinitions([]);
    };
  }, []);

  return (
    <Panel model={{}} actions={[addIconAction(create)]} >
      <Table columnDefinitions={columnDefinitions} requestRowObjectsFunction={findCustomers} filterDefinitions={filterDefinitions} ></Table>
    </Panel>
  );
}

export default withPage("customers")(Customers);