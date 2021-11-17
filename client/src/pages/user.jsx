import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import useNavigation from '../hooks/navigation';
import SubmitButton from '../components/controls/buttons/submit-button';
import MailField from '../components/controls/fields/input/mail-field';
import PasswordField from '../components/controls/fields/input/password-field';
import TextField from '../components/controls/fields/input/text-field';
import SelectField from '../components/controls/fields/select/select-field';
import PanelForm from '../components/containers/panel-form';
import { useAlertMessage } from '../contexts/alert-message-context';
import { useError } from '../contexts/error-context';
import { findUserById, getAllUserProfiles, updateUser } from '../services/server/user-service';

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
  const navigation = useNavigation();
  const [update, setUpdate] = useState(false);
  const modelState = useState(null);
  const [model, setModel] = modelState;
  const [profiles, setProfiles] = useState([]);
  const { addSuccessMessage, addErrorMessage } = useAlertMessage();
  const { addFieldError } = useError();
  const location = useLocation();

  const onCreateUser = () => {
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
          navigation.navigateTo('/Users');
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

  function updateProfileList(response) {
    let profileList = response.map((profile) => { return {value: profile.id, label: profile.description }; });
    setProfiles(profileList);
  }

  useEffect(() => {
    let allUserProfilesPromise = getAllUserProfiles();
    if (location.state && location.state.userName) {
      setUpdate(true);

      try {
        Promise.all([allUserProfilesPromise, findUserById(location.state.id)]).then(responses => {
          updateProfileList(responses[0]);
          let localUser = responses[1];
          localUser.profile = localUser.profile.id;
          setModel(localUser);
        });
      } catch (err) {
        addErrorMessage('Se produzco un error al buscar el cliente ' + location.state.userName);
        navigation.navigateTo('/Users');
      }
    }
    else {
      allUserProfilesPromise.then(allUserProfiles => {
        updateProfileList(allUserProfiles);
        setModel({ profile: allUserProfiles[0].id })
      });
    }
  }, [location.state]);

  return (
    <PanelForm title={getTitle()} size="medium" model={modelState} onSubmit={onCreateUser} >
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
              options={profiles}
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
