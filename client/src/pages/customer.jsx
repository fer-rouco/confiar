import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useTranslation } from "react-i18next";
import useNavigation from '../hooks/navigation';
import SubmitButton from '../components/controls/buttons/submit-button';
import MailField from '../components/controls/fields/input/mail-field';
import PhoneField from '../components/controls/fields/input/phone-field';
import TextField from '../components/controls/fields/input/text-field';
import PanelForm from '../components/containers/panel-form';
import { useAlertMessage } from '../contexts/alert-message-context';
import { useError } from '../contexts/error-context';
import { findCustomerById, updateCustomer } from '../services/server/customer-service';
import FileUpload from '../components/controls/fields/file-upload';
import withPage from '../components/containers/page';

function Customer() {
  const navigation = useNavigation();
  const [update, setUpdate] = useState(false);
  const modelState = useState(null);
  const [model, setModel] = modelState;
  const { addSuccessMessage, addErrorMessage } = useAlertMessage();
  const { addFieldError } = useError();
  const location = useLocation();
  const { t } = useTranslation('pages', { keyPrefix: 'customer' });

  const onCreateUser = () => {
    let valid = true;
    if (valid) {
      let responsePromise = updateCustomer(createTransferObject(model.id));
      responsePromise
        .then((user) => {
          // TODO: Translate
          addSuccessMessage('El cliente ' + user.name + ' fue ' + (update ? 'actualizado' : 'creado') + ' exitosamente.');
          navigation.navigateToId('customers');
        })
        .catch((error) => {
          addErrorMessage(error.message);
          addFieldError(error.field, error.message);
        });
    }
  };

  function createTransferObject(id) {
    let object = {
      name: model.name,
      lastName: model.lastName,
      address: model.address,
      mail: model.mail,
      phone: model.phone,
      identityDocuments: model.identityDocuments,
      paychecks: model.paychecks
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

  useEffect(() => {
    if (location.state && location.state.id) {
      setUpdate(true);
      findCustomerById(location.state.id)
        .then((customer) => {
          setModel(customer);
        })
        .catch(() => {
          navigation.navigateToId('customers');
        });
    }
    else {
      setModel({});
    }
  }, [location.state]);

  return (
    <PanelForm title={getTitle()} size="medium" model={modelState} onSubmit={onCreateUser} >
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <TextField attr="name" minLength="2" required></TextField>
          </div>
          <div className="col-md-6">
            <TextField attr="lastName" minLength="2" required></TextField>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <MailField attr="mail" required></MailField>
          </div>
          <div className="col-md-6">
            <PhoneField attr="phone" required></PhoneField>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <TextField attr="address" minLength="2" required></TextField>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FileUpload attr="identityDocuments" required></FileUpload>
          </div>
          <div className="col-md-6">
            <FileUpload attr="paychecks" required></FileUpload>
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

export default withPage("customer")(Customer);