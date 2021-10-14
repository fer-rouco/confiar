import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import SubmitButton from '../components/controls/buttons/submit-button';
import MailField from '../components/controls/fields/input/mail-field';
import PasswordField from '../components/controls/fields/input/password-field';
import TextField from '../components/controls/fields/input/text-field';
import SelectField from '../components/controls/fields/select/select-field';
import PanelForm from '../components/panel-form';
import { useAlertMessage } from '../contexts/alert-message-context';
import { useError } from '../contexts/error-context';
import { findUserById, updateUser } from '../services/user-service';

const [NAME, LAST_NAME, USER_NAME, EMAIL, PASSWORD, REPEAT_PASSWORD, PROFILE] =
  [
    { id: 'name', label: 'Nombre' },
    { id: 'lastName', label: 'Apellido' },
    { id: 'userName', label: 'Usuario' },
    { id: 'mail', label: 'E-Mail' },
    { id: 'password', label: 'Contraseña' },
    { id: 'repeatPassword', label: 'Repetir Contraseña' },
    { id: 'profile', label: 'Perfil' },
  ];

export default function User() {
  const history = useHistory();
  const [update, setUpdate] = useState(false);
  const [model, setModel] = useState({});
  const { addSuccessMessage, addErrorMessage } = useAlertMessage();
  const { addFieldError, cleanFieldError } = useError();
  const location = useLocation();

  const onCreateUser = () => {
    cleanFieldError();
    let valid = true;
    if (!update && model.password !== model.repeatPassword) {
      valid = false;
      addFieldError(
        REPEAT_PASSWORD.id,
        'Esta contraseña debe ser igual a la del campo password.',
      );
    }
    if (valid) {
      let responsePromise = updateUser(createTransferObject(model.id));
      responsePromise
        .then((user) => {
          addSuccessMessage(
            'El usuario ' +
              user.name +
              ' fue ' +
              (update ? 'actualizado' : 'creado') +
              ' exitosamente.',
          );
          history.push('/Users', { store: model.store });
        })
        .catch((error) => {
          addFieldError(error.field, error.message);
          addErrorMessage(error.message);
        });
    }
  };

  function createTransferObject(id) {
    let object = {
      name: model.name,
      lastName: model.lastName,
      userName: model.userName,
      mail: model.mail,
      password: model.password,
      repeatPassword: model.repeatPassword,
      profile: { id: model.profile },
    };
    object.store = model.store;

    if (id) {
      object.id = id;
    }

    return object;
  }

  const getActionLabel = () => {
    return update ? 'Actualizar' : 'Crear';
  };

  const getTitle = () => {
    let name = (location.state) ? location.state.name : "";
    return (
      getActionLabel() + ' usuario ' + (update ? name : 'nuevo') + '.'
    );
  };

  useEffect(() => {
    if (location.state && location.state.userName) {
      setUpdate(true);
      findUserById(location.state.id)
        .then((user) => {
          let localModel = user;
          localModel.profile = user.profile.id;
          setModel(localModel);
        })
        .catch(() => {
          history.push('/Users');
        });
    }
  }, [location.state]);

  return (
    <PanelForm
      title={getTitle()}
      size="medium"
      model={model}
      onSubmit={onCreateUser}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <TextField
              attr={NAME.id}
              label={NAME.label}
              minLength="2"
              required
            ></TextField>
          </div>
          <div className="col-md-6">
            <TextField
              attr={LAST_NAME.id}
              label={LAST_NAME.label}
              minLength="2"
              required
            ></TextField>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <TextField
              attr={USER_NAME.id}
              label={USER_NAME.label}
              minLength="2"
              required
            ></TextField>
          </div>
          <div className="col-md-6">
            <MailField attr={EMAIL.id} label={EMAIL.label} required></MailField>
          </div>
        </div>
        {!update ? (
          <div className="row">
            <div className="col-md-6">
              <PasswordField
                attr={PASSWORD.id}
                label={PASSWORD.label}
                minLength="8"
                required
              ></PasswordField>
            </div>
            <div className="col-md-6">
              <PasswordField
                attr={REPEAT_PASSWORD.id}
                label={REPEAT_PASSWORD.label}
                minLength="8"
                required
              ></PasswordField>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="row">
          <div className="col-md-6">
            <SelectField
              attr={PROFILE.id}
              label={PROFILE.label}
              options={[
                { value: 1, label: 'Administrador' },
                { value: 2, label: 'Vendedor' },
                { value: 3, label: 'Administrativo' }
              ]}
              required
            ></SelectField>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-2" align="center">
          <SubmitButton label={getActionLabel()}></SubmitButton>
        </div>
      </div>
    </PanelForm>
  );
}
