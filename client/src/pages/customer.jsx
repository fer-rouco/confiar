import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import SubmitButton from '../components/controls/buttons/submit-button';
import MailField from '../components/controls/fields/input/mail-field';
import PhoneField from '../components/controls/fields/input/phone-field';
import TextField from '../components/controls/fields/input/text-field';
import PanelForm from '../components/panel-form';
import { useAlertMessage } from '../contexts/alert-message-context';
import { useError } from '../contexts/error-context';
import { createCustomer, findCustomerById, updateCustomer } from '../services/customer-service';
import FileUpload from '../components/controls/file-upload';

const [NAME, LAST_NAME, ADDRESS, EMAIL, PHONE, IDENTITY_DOCUMENTS, PAYCHECKS] =
  [
    { id: 'name', label: 'Nombre' },
    { id: 'lastName', label: 'Apellido' },
    { id: 'address', label: 'Dirección' },
    { id: 'mail', label: 'E-Mail' },
    { id: 'phone', label: 'Celular' },
    { id: 'identityDocuments', label: 'DNI (Frente y Dorso)' },
    { id: 'paychecks', label: 'Recibos de sueldo' },
  ];

export default function Customer() {
  const history = useHistory();
  const [update, setUpdate] = useState(false);
  const [model, setModel] = useState({});
  const { addSuccessMessage, addErrorMessage } = useAlertMessage();
  const { addFieldError, cleanFieldError } = useError();
  const location = useLocation();

  const onCreateUser = () => {
    cleanFieldError();
    let valid = true;
    if (valid) {
      let responsePromise = updateCustomer(createTransferObject(model.id));
      responsePromise
        .then((user) => {
          addSuccessMessage('El cliente ' + user.name + ' fue ' + (update ? 'actualizado' : 'creado') + ' exitosamente.');
          history.push('/Customers');
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
    return update ? 'Actualizar' : 'Crear';
  };

  const getTitle = () => {
    let name = (location.state) ? location.state.name : "";
    return (
      getActionLabel() + ' cliente ' + (update ? name : 'nuevo') + '.'
    );
  };

  useEffect(() => {
    if (location.state && location.state.id) {
      setUpdate(true);
      findCustomerById(location.state.id)
        .then((customer) => {
          setModel(customer);
        })
        .catch(() => {
          history.push('/Customers');
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
            <TextField attr={NAME.id} label={NAME.label} minLength="2" required></TextField>
          </div>
          <div className="col-md-6">
            <TextField attr={LAST_NAME.id} label={LAST_NAME.label} minLength="2" required></TextField>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <MailField attr={EMAIL.id} label={EMAIL.label} required></MailField>
          </div>
          <div className="col-md-6">
            <PhoneField attr={PHONE.id} label={PHONE.label} required></PhoneField>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <TextField attr={ADDRESS.id} label={ADDRESS.label} minLength="2" required></TextField>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FileUpload attr={IDENTITY_DOCUMENTS.id} label={IDENTITY_DOCUMENTS.label} required></FileUpload>
          </div>
          <div className="col-md-6">
            <FileUpload attr={PAYCHECKS.id} label={PAYCHECKS.label} required></FileUpload>
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
