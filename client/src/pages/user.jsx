import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useTranslation } from "react-i18next";
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
import withPage from '../components/containers/page';
import { createModel } from '../components/controls/fields/model-context';

function User() {
  const navigation = useNavigation();
  const [update, setUpdate] = useState(false);
  const modelState = createModel();
  const [model, setModel] = modelState;
  const [profiles, setProfiles] = useState([]);
  const { addSuccessMessage, addErrorMessage } = useAlertMessage();
  const { addFieldError } = useError();
  const location = useLocation();
  const { t } = useTranslation('pages', { keyPrefix: 'user' });
  const REPEAT_PASSWORD = 'repeatPassword';
  
  const onCreateUser = () => {
    let valid = true;
    if (!update && model.password !== model.repeatPassword) {
      valid = false;
      // TODO: Translate
      addFieldError(REPEAT_PASSWORD, 'Esta contraseña debe ser igual a la del campo password.');
    }
    if (valid) {
      let responsePromise = updateUser(createTransferObject(model.id));
      responsePromise
        .then((user) => {
          // TODO: Translate
          addSuccessMessage('El usuario ' + user.name + ' fue ' + (update ? 'actualizado' : 'creado') + ' exitosamente.');
          navigation.navigateToId('users');
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
    return t('main.panel.submitButton.' + ((update) ? 'update' : 'create'));
  };

  const getTitle = () => {
    let name = (location.state) ? location.state.name : "";
    return t('main.panel.title.' + ((update) ? 'update' : 'new'), { "name": name})
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
        // TODO: Translate
        addErrorMessage('Se produzco un error al buscar el cliente ' + location.state.userName);
        navigation.navigateToId('users');
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
            <TextField attr='name' minLength="2" required ></TextField>
          </div>
          <div className="col-md-6">
            <TextField attr='lastName' minLength="2" required ></TextField>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <TextField attr='userName' minLength="2" required ></TextField>
          </div>
          <div className="col-md-6">
            <MailField attr='mail' required></MailField>
          </div>
        </div>
        {!update ? (
          <div className="row">
            <div className="col-md-6">
              <PasswordField attr='password' minLength="8" required ></PasswordField>
            </div>
            <div className="col-md-6">
              <PasswordField attr={REPEAT_PASSWORD} minLength="8" required ></PasswordField>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="row">
          <div className="col-md-6">
            <SelectField attr='profile' options={profiles} required ></SelectField>
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

export default withPage()(User);
