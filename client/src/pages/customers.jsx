import { useHistory } from 'react-router';
import { useAlertMessage } from '../contexts/alert-message-context';
import { removeCustomer, findCustomers } from '../services/customer-service';
import Panel from '../components/containers/panel';
import Table from '../components/table/table';
import { removeColumnDefinition, textColumnDefinition } from '../components/table/column-definitions/column-definition';
// import Form from '../components/containers/form';
// import TextField from '../components/controls/fields/input/text-field';

// TODO: Filtros
// const [NAME] =
//   [
//     { id: 'name', label: 'Nombre' }
//   ];


export default function Customers() {
  const history = useHistory();
  const { addSuccessMessage, addErrorMessage } = useAlertMessage();

  function create() {
    history.push('/Customer');
  };

  let columnDefinitions = [
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

  return (
    <Panel
      title="Clientes"
      size="large"
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
      {/* TODO: Filtros */}
      {/* <Form>
        <div className="row">
          <div className="col-md-3">
            <TextField attr={NAME.id} label={NAME.label} ></TextField>
          </div>
        </div>
      </Form> */}
      <Table columnDefinitions={columnDefinitions} requestRowObjectsFunction={findCustomers} ></Table>
    </Panel>
  );
}
