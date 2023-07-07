import styled from 'styled-components';
import { navigateIntoObjectByPath } from '../../../../theme';
import baseField from '../base-field';

const getThemeAttribute = (theme, attribute) => {
  return navigateIntoObjectByPath(theme, "components.controls.fields.select." + attribute);
}

const StyledFormSelect = styled.select`
  background-color: ${({ theme }) => getThemeAttribute(theme, "bgColor")};
  color: ${({ theme }) => getThemeAttribute(theme, "color")};

  &.form-select {
    height: 40px;
    padding-top: 14px !important;
    padding-bottom: 4px !important;
    margin-bottom: 20px !important;
    font-size: 1rem;
    padding-left: 0.75rem;
  }

  &.form-select:focus, &.form-select:not(:placeholder-shown) {
    padding-top: 1.25rem;
  }

  &.form-select ~ label {
    color: ${({ theme }) => getThemeAttribute(theme, "color")};
    padding-top: 8px;
  }
  
  &.form-select:focus ~ label, &.form-select:not(:placeholder-shown) ~ label {
    opacity: 0.50;
    transform: scale(0.70) translateY(-0.5rem) translateX(0.30rem);
  }
`;

// props: register, attr, label, options
export default function SelectField(props) {
  const field = baseField({...props, type: "select"});

  const getOptions = () => {
    return props.options.map((option) => (
      <option value={option.value} key={option.value}>
        {option.label}
      </option>
    ));
  };

  field.useEffect();

  return (
    <div ref={field.ref} className="form-floating" >
      <StyledFormSelect
        {...field.register ? {...field.register(props.attr)} : (null)}
        id={field.getId()}
        className="field form-select form-select-lg mb-4"
        required={props.required}
        onChange={field.update}
        title={field.label}
      >
        {getOptions()}
      </StyledFormSelect>
      <label htmlFor="floatingInput">{field.label}</label>
    </div>
  );
}
