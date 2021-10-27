import { useHistory } from 'react-router';
import { useAlertMessage } from '../contexts/alert-message-context';
import { removeCustomer, findCustomers } from '../services/customer-service';
import Panel from '../components/containers/panel';
import Table from '../components/table/table';
import { removeColumnDefinition, textColumnDefinition } from '../components/table/column-definitions/column-definition';

export default function Customers() {
  const history = useHistory();
  const { addSuccessMessage, addErrorMessage } = useAlertMessage();

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
      label: 'E-Mail'
    }),
    removeColumnDefinition({
      key: 'remove',
      icon: 'trash-fill',
      dialogConfig: {
        title: 'Eliminar Cliente',
        message: 'Esta seguro que desea eliminar el cliente <%NAME%>?',
        onAccept: (model) => {
          return removeCustomer(model.id)
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

  const filters = [
    columnDefinitions[0].key,
    columnDefinitions[1].key,
    columnDefinitions[2].key
  ];

  return (
    <Panel
      title="Clientes"
      model={{}}
      actions={[
        {
          key: 'add',
          icon: 'plus',
          action: create,
          tooltip: 'Crear un cliente nuevo.',
        },
      ]}
    >
      <Table columnDefinitions={columnDefinitions} requestRowObjectsFunction={findCustomers} filters={filters} ></Table>
    </Panel>
  );
}
