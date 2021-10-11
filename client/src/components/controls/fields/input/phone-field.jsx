import InputField from './input-field';

export default function PhoneField(props) {
  const PHONE_NUMBER_PATTERN = /^(\+)?(\d{1,2})?[( .-]*(\d{3})[) .-]*(\d{3,4})[ .-]?(\d{4})$/;
  const validationObject = {
    pattern: {
      value: new RegExp(PHONE_NUMBER_PATTERN),
      message: 'Número telefonico inválido.'
    }
  };
  return <InputField type="tel" minLength="6" maxLength="15" validationObject={validationObject} {...props}></InputField>;
}
