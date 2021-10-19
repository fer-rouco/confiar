import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useAlertMessage } from '../contexts/alert-message-context';
import { useDialog } from '../contexts/dialog-context';
import { removeCustomer, getAllCustomers } from '../services/customer-service';
import Panel from '../components/panel';
import Table from '../components/table/table';
import { removeColumnDefinition, textColumnDefinition } from '../components/table/column-definitions/column-definition';

export default function Customers() {
  const history = useHistory();
  const location = useLocation();
  const dialog = useDialog();
  const { addSuccessMessage, addErrorMessage } = useAlertMessage();
  const [customers, setCustomers] = useState(null);

  function create() {
    history.push('/Customer');
  };

  const columnDefinitions = [
    textColumnDefinition({
      key: 'name',
      label: 'Nombre',
      target: '/Customer'
    }),
    textColumnDefinition({
      key: 'lastName',
      label: 'Apellido'
    }),
    textColumnDefinition({
      key: 'mail', 
      label: 'Mail'
    }),
    removeColumnDefinition({
      key: 'remove',
      icon: 'trash-fill',
      dialogConfig: {
        title: 'Eliminar Cliente',
        message: 'Esta seguro que desea eliminar el cliente <%NAME%> ?',
        onAccept: (model) => {
          removeCustomer(model.id)
            .then(() => {
              addSuccessMessage(
                'El cliente ' + model.name + ' fue eliminado exitosamente.',
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

  useEffect(() => {
    getAllCustomers().then((customerList) => {
      setCustomers(customerList);
    });
  }, [location, dialog.getActionExecuted()]);

  return (
    <Panel
      title="Clientes"
      size="large"
      model={customers}
      actions={[
        {
          key: 'add',
          icon: 'plus',
          action: create,
          tooltip: 'Crear un cliente nuevo.',
        },
      ]}
    >
      <Table columnDefinitions={columnDefinitions} rowObjects={customers} ></Table>
    </Panel>
  );
}
