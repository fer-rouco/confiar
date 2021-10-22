import React from 'react';

import { useSession } from '../contexts/session-context';
import PanelForm from '../components/containers/panel-form';
import TextField from '../components/controls/fields/input/text-field';
import PasswordField from '../components/controls/fields/input/password-field';
import SubmitButton from '../components/controls/buttons/submit-button';

const [USER, PASSWORD] = ['user', 'password'];

export default function Login() {
  const { logIn } = useSession();

  const doLogin = (userData) => {
    if (userData.user && userData.password) {
      logIn(userData.user, userData.password);
    }
  };

  return (
    <PanelForm title="Login" size="small" onSubmit={doLogin} model={{}} >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <TextField
              attr={USER}
              label="User or Email address"
              required
            ></TextField>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <PasswordField
              attr={PASSWORD}
              label="Password"
              required
            ></PasswordField>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <SubmitButton
              label="Sign in"
              className="w-100"
              large
            ></SubmitButton>
          </div>
        </div>
      </div>
    </PanelForm>
  );
}
