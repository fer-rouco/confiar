import { useEffect, useState } from 'react';
import useNavigation from '../hooks/navigation';
import { useAlertMessage } from '../contexts/alert-message-context';
import { removeCustomer, findCustomers } from '../services/server/customer-service';
import Panel from '../components/containers/panel';
import Table from '../components/table/table';
import { removeColumnDefinition, textColumnDefinition } from '../components/table/column-definitions/column-definition';
import withPage from '../components/containers/page';
import { usePage } from '../contexts/page-context';

function Customers() {
  const navigation = useNavigation();
  const { addSuccessMessage, addErrorMessage } = useAlertMessage();
  const [columnDefinitions, setColumnDefinitions] = useState([]);
  const [filterDefinitions, setFilterDefinitions] = useState([]);
  const { translation } = usePage();

  function create() {
    navigation.navigateTo('/Customer');
  };

  useEffect(() => {
    setColumnDefinitions([
      textColumnDefinition({ key: 'name', target: '/Customer' }),
      textColumnDefinition({ key: 'lastName' }),
      textColumnDefinition({ key: 'mail' }),
      removeColumnDefinition({
        key: 'remove',
        icon: 'trash-fill',
        dialogConfig: {
          key: 'remove',
          message: { key: "message", placeholders: ["name"] },
          onAccept: (model) => {
            return removeCustomer(model.id)
              .then(() => {
                addSuccessMessage(translation("remove.successMessage", { name: model.name }));
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
    <Panel
      model={{}}
      actions={[
        {
          key: 'add',
          icon: 'plus',
          action: create
        },
      ]}
    >
      <Table columnDefinitions={columnDefinitions} requestRowObjectsFunction={findCustomers} filterDefinitions={filterDefinitions} ></Table>
    </Panel>
  );
}

export default withPage("customers")(Customers);