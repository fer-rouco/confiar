import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Dialog from '../components/dialog/dialog';
import { useAlertMessage } from '../contexts/alert-message-context';
import { removeCustomer, getAllCustomers } from '../services/customer-service';
import Panel from '../components/panel';
import Table from '../components/table/table';
import { iconColumnDefinition, textColumnDefinition } from '../components/table/column-definitions/column-definition';
import { yesNoDialogConfig } from '../components/dialog/dialog-config';

export default function Customers() {
  const history = useHistory();
  const location = useLocation();
  const { addSuccessMessage, addErrorMessage } = useAlertMessage();
  const [customers, setCustomers] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [customerToBeDeleted, setCustomerToBeDeleted] = useState(null);
  
  const getTitle = () => {
    return 'Clientes';
  };

  const create = () => {
    history.push('/Customer');
  };

  const removeAlert = useCallback(
    (customer) => {
      setCustomerToBeDeleted(customer);
      setShowDialog(true);
    },
    [setCustomerToBeDeleted],
  );

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
    iconColumnDefinition({
      key: 'remove',
      icon: 'trash-fill',
      onClick: (rowObject) => removeAlert(rowObject)
    })
  ];
    
  const dialogConfig = yesNoDialogConfig({
    title: 'Eliminar Cliente',
    message: 'Esta seguro que desea eliminar el cliente ' + (customerToBeDeleted ? customerToBeDeleted.name : '') + '?',
    onAccept: () => {
      removeCustomer(customerToBeDeleted.id)
        .then(() => {
          addSuccessMessage(
            'El cliente ' + customerToBeDeleted.name + ' fue eliminado exitosamente.',
          );
        })
        .then((errorData) => {
          if (errorData) {
            addErrorMessage(errorData.message);
          }
        });
    }
  });

  const refreshTable = useCallback(() => {
    getAllCustomers().then((customerList) => {
      setCustomers(customerList);
    });
  }, [location, removeAlert]);

  useEffect(() => {
    refreshTable();
  }, [refreshTable]);

  return (
    <Panel
      title={getTitle()}
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

      <Dialog config={dialogConfig} show={showDialog} setShow={setShowDialog} ></Dialog>
    </Panel>
  );
}
