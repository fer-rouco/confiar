import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import AlertDialog from '../components/alert-dialog';
import { useAlertMessage } from '../contexts/alert-message-context';
import { deleteUser, findUsersByStore } from '../services/user-service';
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
  { id: 'user', label: 'Usuario' },
  { id: 'mail', label: 'E-Mail' },
  { id: 'profile', label: 'Perfil' },
  { id: 'remove', label: '' },
];

export default function Users() {
  const history = useHistory();
  const location = useLocation();
  const { addSuccessMessage, addErrorMessage } = useAlertMessage();
  const [userItems, setUserItems] = useState([]);
  const [users, setUsers] = useState(null);
  const [show, setShow] = useState(false);
  const [alertConfirmation, setAlertConfirmation] = useState(false);
  const [userToBeDeleted, setUserToBeDeleted] = useState(null);

  const getProfileDescription = (profile) => {
    let profileDescription = '';

    if (profile === 1) {
      profileDescription = 'Cajero';
    } else if (profile === 2) {
      profileDescription = 'Supervisor';
    }

    return profileDescription;
  };

  const getTitle = () => {
    return !location.state || !location.state.store
      ? ''
      : 'Usuarios de la tienda ' + location.state.store.name;
  };

  const createUser = () => {
    history.push('/User', { store: location.state.store, profile: 1 });
  };

  const deleteUserAlert = useCallback(() => {
    setShow(true);
  }, [setShow]);

  const removeUser = useCallback(
    (user) => {
      setUserToBeDeleted(user);
      deleteUserAlert();
    },
    [deleteUserAlert, setUserToBeDeleted],
  );

  const refreshTable = useCallback(() => {
    let storeId = !location.state ? -1 : location.state.store.id;
    if (storeId > -1) {
      const getTableRowClass = (index) => {
        return index % 2 !== 0 ? 'table-secondary' : '';
      };

      findUsersByStore(storeId).then((userList) => {
        setUsers(userList);
        const userItemList = userList.map((user, index) => (
          <tr key={user.userName}>
            <StyledTH className={getTableRowClass(index)} scope="row">
              <Link to={{ pathname: '/User', state: user }}>{user.name}</Link>
            </StyledTH>
            <StyledTD className={getTableRowClass(index)}>
              {user.lastName}
            </StyledTD>
            <StyledTD className={getTableRowClass(index)}>{user.user}</StyledTD>
            <StyledTD className={getTableRowClass(index)}>{user.mail}</StyledTD>
            <StyledTD className={getTableRowClass(index)}>
              {getProfileDescription(user.profile)}
            </StyledTD>
            <StyledTD className={getTableRowClass(index) + ' fs-4 mb-3'}>
              <Icon
                fontName="trash-fill"
                medium
                onClick={() => removeUser(user)}
              ></Icon>
            </StyledTD>
          </tr>
        ));
        setUserItems(userItemList);
      });
    }
  }, [location, removeUser]);

  useEffect(() => {
    refreshTable();
  }, [refreshTable]);

  useEffect(() => {
    if (alertConfirmation) {
      setAlertConfirmation(false);
      if (userToBeDeleted) {
        const userName = userToBeDeleted.name;
        deleteUser(userToBeDeleted.id)
          .then((user) => {
            addSuccessMessage(
              'El usuario ' + userName + ' fue eliminado exitosamente.',
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
    alertConfirmation,
    userToBeDeleted,
    refreshTable,
    setAlertConfirmation,
    addSuccessMessage,
    addErrorMessage,
  ]);

  return (
    <Panel
      title={getTitle()}
      size="large"
      model={users}
      actions={[
        {
          id: 'add',
          icon: 'plus',
          action: createUser,
          tooltip: 'Crear un usuario nuevo.',
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
        <tbody>{userItems}</tbody>
      </table>

      <AlertDialog
        title="Eliminar Usuario"
        message={
          'Esta seguro que desea eliminar el usuario ' +
          (userToBeDeleted ? userToBeDeleted.name : '') +
          '?'
        }
        show={show}
        setShow={setShow}
        setConfirmation={setAlertConfirmation}
      ></AlertDialog>
    </Panel>
  );
}
