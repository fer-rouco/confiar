import React, { useState } from 'react';

import { logIn } from './../services/server/session-service';
import withPage from '../components/containers/page';
import PanelForm from '../components/containers/panel-form';
import TextField from '../components/controls/fields/input/text-field';
import PasswordField from '../components/controls/fields/input/password-field';
import SubmitButton from '../components/controls/buttons/submit-button';
import { useError } from '../contexts/error-context';
import { useAlertMessage } from '../contexts/alert-message-context';
import useNavigation from '../hooks/navigation';

function Login() {
  const modelState = useState(null);
  const [model] = modelState;
  const { addFieldError } = useError();
  const { addSuccessMessage, addErrorMessage } = useAlertMessage();
  const navigation = useNavigation();

  const doLogIn = () => {
    if (model.user && model.password) {
      logIn(model.user, model.password)
        .then(() => {
          // TODO: Translate
          addSuccessMessage('Te logueaste exitosamente!');
          navigation.navigateToId('customers');
        })
        .catch((error) => {
          addFieldError(error.field, error.message);
          addErrorMessage(error.message);
        });
    }
  };

  return (
    <PanelForm size="small" onSubmit={doLogIn} model={modelState} >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <TextField attr="user" required ></TextField>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <PasswordField attr="password" required ></PasswordField>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <SubmitButton className="w-100" large ></SubmitButton>
          </div>
        </div>
      </div>
    </PanelForm>
  );
}

export default withPage()(Login);
