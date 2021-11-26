import React, { useState } from 'react';

import { useSession } from '../contexts/session-context';
import withPage from '../components/containers/page';
import PanelForm from '../components/containers/panel-form';
import TextField from '../components/controls/fields/input/text-field';
import PasswordField from '../components/controls/fields/input/password-field';
import SubmitButton from '../components/controls/buttons/submit-button';

function Login() {
  const { logIn } = useSession();
  const modelState = useState(null);
  const [model] = modelState;

  const doLogin = () => {
    if (model.user && model.password) {
      logIn(model.user, model.password);
    }
  };

  return (
    <PanelForm size="small" onSubmit={doLogin} model={modelState} >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <TextField attr="user" required
            ></TextField>
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

export default withPage("login")(Login);
