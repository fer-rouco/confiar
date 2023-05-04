import { useEffect, useState } from 'react';
import useNavigation from '../hooks/navigation';
import { removeCustomer, findCustomers } from '../services/server/customer-service';
import Panel from '../components/containers/panel';
import Table from '../components/table/table';
import { removeColumnDefinition, textColumnDefinition } from '../components/table/column-definitions/column-definition';
import withPage from '../components/containers/page';
import { addIconAction } from '../components/controls/action-definition';
import { createModel, updateModel } from '../components/controls/fields/model-context';

function Customers() {
  const modelState = createModel();
  const navigation = useNavigation();
  const [columnDefinitions, setColumnDefinitions] = useState([]);
  const [filterDefinitions, setFilterDefinitions] = useState([]);

  function create() {
    navigation.navigateToId('customer');
  };

  useEffect(() => {
    setColumnDefinitions([
      textColumnDefinition({ key: 'name', target: 'customer' }),
      textColumnDefinition({ key: 'lastName' }),
      textColumnDefinition({ key: 'mail' }),
      removeColumnDefinition({
        dialogDefinition: {
          onAccept: (model) => { return removeCustomer(model.id); }
        }
      })
    ]);

    setFilterDefinitions([
      textColumnDefinition({ key: 'name' }),
      textColumnDefinition({ key: 'lastName' }),
      textColumnDefinition({ key: 'mail' })
    ]);
        
    updateModel(modelState);

    return () => {
      setColumnDefinitions([]);
      setFilterDefinitions([]);
    };
  }, []);

  return (
    <Panel model={modelState} actions={[addIconAction(create)]} >
      <Table requestRowObjectsFunction={findCustomers} columnDefinitions={columnDefinitions} filterDefinitions={filterDefinitions} ></Table>
    </Panel>
  );
}

export default withPage()(Customers);