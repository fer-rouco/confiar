import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import AcceptCancelDialog from '../components/dialog/accept-cancel-dialog';
import { useAlertMessage } from '../contexts/alert-message-context';
import { removeCustomer, getAllCustomers } from '../services/customer-service';
import Panel from '../components/panel';
import Icon from '../components/icon';
import styled from 'styled-components';

const StyledTD = styled.td`
  vertical-align: middle;
`;

const StyledTH = styled.th`
  vertical-align: middle;
`;

const columns = [
  { id: 'name', label: 'Nombre' },
  { id: 'lastName', label: 'Apellido' },
  { id: 'mail', label: 'E-Mail' },
  { id: 'remove', label: '' }
];

export default function Customers() {
  const history = useHistory();
  const location = useLocation();
  const { addSuccessMessage, addErrorMessage } = useAlertMessage();
  const [customerItems, setCustomerItems] = useState([]);
  const [customers, setCustomers] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogConfirmation, setDialogConfirmation] = useState(false);
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

  const refreshTable = useCallback(() => {
    const getTableRowClass = (index) => {
      return index % 2 !== 0 ? 'table-secondary' : '';
    };

    getAllCustomers().then((customerList) => {
      setCustomers(customerList);
      const customerItemList = customerList.map((customer, index) => (
        <tr key={customer.mail}>
          <StyledTH className={getTableRowClass(index)} scope="row">
            <Link to={{ pathname: '/Customer', state: customer }}>{customer.name}</Link>
          </StyledTH>
          <StyledTD className={getTableRowClass(index)}>
            {customer.lastName}
          </StyledTD>
          <StyledTD className={getTableRowClass(index)}>{customer.mail}</StyledTD>
          <StyledTD className={getTableRowClass(index) + ' fs-4 mb-3'}>
            <Icon
              fontName="trash-fill"
              medium
              onClick={() => removeAlert(customer)}
            ></Icon>
          </StyledTD>
        </tr>
      ));
      setCustomerItems(customerItemList);
    });
  }, [location, removeAlert]);

  useEffect(() => {
    refreshTable();
  }, [refreshTable]);

  useEffect(() => {
    if (dialogConfirmation) {
      setDialogConfirmation(false);
      if (customerToBeDeleted) {
        const customerName = customerToBeDeleted.name;
        removeCustomer(customerToBeDeleted.id)
          .then((customer) => {
            addSuccessMessage(
              'El usuario ' + customerName + ' fue eliminado exitosamente.',
            );
            refreshTable();
          })
          .then((errorData) => {
            if (errorData) {
              addErrorMessage(errorData.message);
            }
          });
      }
    }
  }, [
    dialogConfirmation,
    customerToBeDeleted,
    refreshTable,
    setDialogConfirmation,
    addSuccessMessage,
    addErrorMessage,
  ]);

  return (
    <Panel
      title={getTitle()}
      size="large"
      model={customers}
      actions={[
        {
          id: 'add',
          icon: 'plus',
          action: create,
          tooltip: 'Crear un cliente nuevo.',
        },
      ]}
    >
      <table className="table table-hover">
        <thead>
          <tr>
            {columns.map((column) => (
              <StyledTH className="table-success" scope="col" key={column.id}>
                {column.label}
              </StyledTH>
            ))}
          </tr>
        </thead>
        <tbody>{customerItems}</tbody>
      </table>

      <AcceptCancelDialog
        title="Eliminar Cliente"
        message={
          'Esta seguro que desea eliminar el cliente ' +
          (customerToBeDeleted ? customerToBeDeleted.name : '') +
          '?'
        }
        show={showDialog}
        setShow={setShowDialog}
        setConfirmation={setDialogConfirmation}
      ></AcceptCancelDialog>
    </Panel>
  );
}
