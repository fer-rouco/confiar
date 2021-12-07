import { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useError } from '../../../../contexts/error-context';
import styled from 'styled-components';
import { navigateIntoObjectByPath } from '../../../../theme';
import baseField from '../base-field';

const getThemeAttribute = (theme, attrribute) => {
  return navigateIntoObjectByPath(theme, "components.controls.fields.input." + attrribute);
}

const StyledErrorMessage = styled.div`
  color: red;
  padding-left: 16px;
  font-size: 10px;
  position: absolute;
  top: 40px;
`;

const StyledFormControl = styled.input`
  background-color: ${({ theme }) => getThemeAttribute(theme, "bgColor")};
  color: ${({ theme }) => getThemeAttribute(theme, "color")};

  &.floating-mode {
    height: 40px;
    margin-bottom: 20px;
  }

  &.small-mode:not(:placeholder-shown) {
    padding: 4px;
    margin: 0;
  }

  &.form-control:focus, &.form-control:not(:placeholder-shown) {
    background-color: ${({ theme }) => getThemeAttribute(theme, "bgColor")};
    color: ${({ theme }) => getThemeAttribute(theme, "color")};
    padding-top: 1.25rem;
  }
  
  &.form-control.small-mode:focus, &.form-control.small-mode:not(:placeholder-shown) {
    padding-top: 0.25rem;
  }

  &.form-control ~ label {
    padding-top: 8px;
  }

  &.form-control:focus ~ label, &.form-control:not(:placeholder-shown) ~ label {
    opacity: 0.50;
    transform: scale(0.70) translateY(-0.5rem) translateX(0.30rem);
  }
`;

const StyledLabel = styled.label`
  color: ${({ theme }) => getThemeAttribute(theme, "color")};
`;

// props: register, type, attr, label, required, validationObject
export default function InputField(props) {
  const { formState: { errors } } = useFormContext();
  const { fieldError } = useError();
  const field = baseField(props);

  const cleanErrorClasses = useCallback(() => {
    let fieldDOM = field.getField();
    if (fieldDOM) {
      fieldDOM.classList.remove('is-invalid');
      fieldDOM.classList.remove('is-valid');
    }
  }, [field.getField]);

  const updateErrorClasses = useCallback(() => {
    let fieldDOM = field.getField();
    if (fieldDOM) {
      if ((errors && errors[props.attr]) || fieldError.field === props.attr) {
        fieldDOM.classList.add('is-invalid');
      } else {
        fieldDOM.classList.add('is-valid');
      }
    }
  }, [field.getField, errors, fieldError, props.attr]);

  const handleErrorClasses = useCallback(() => {
    if (!props.avoidValidations) {
      if (field.getValue()) {
        cleanErrorClasses();
        updateErrorClasses();
      } else {
        if (
          errors &&
          errors[props.attr] &&
          errors[props.attr].type === 'required'
        ) {
          updateErrorClasses();
        } else {
          cleanErrorClasses();
        }
      }
    }
  }, [field.getValue, cleanErrorClasses, updateErrorClasses, errors, props.attr]);

  field.useEffect();

  useEffect(() => {
    handleErrorClasses();
  }, [handleErrorClasses, fieldError]);

  let validationObject = props.validationObject ? props.validationObject : {};
  if (props.required) {
    validationObject.required = 'Campo obligatorio';
  }
  if (props.maxLength) {
    validationObject.maxLength = {
      value: props.maxLength,
      message:
        'El campo debe tener como maximo ' + props.maxLength + ' caracteres',
    };
  }
  if (props.minLength) {
    validationObject.minLength = {
      value: props.minLength,
      message:
        'El campo debe tener como minimo ' + props.minLength + ' caracteres',
    };
  }
  if (props.max) {
    validationObject.max = {
      value: props.max,
      message: 'Supero el maximo del campo. Maximo: ' + props.max,
    };
  }
  if (props.min) {
    validationObject.min = {
      value: props.min,
      message: 'Supero el minimo del campo. Minimo: ' + props.min,
    };
  }
  if (props.pattern) {
    validationObject.pattern = {
      value: new RegExp(props.pattern),
      message: 'El campo debe respetar el siguiente patron: ' + props.pattern,
    };
  }
  if (props.type === 'mail') {
    let pattern =
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$";
    if (props.pattern) {
      pattern = props.pattern;
    }
    validationObject.pattern = {
      value: new RegExp(pattern),
      message: 'E-Mail invalido.',
    };
  }

  return (
    <div className={(!props.small) ? "form-floating" : "input-group mb-3" } ref={field.ref} style={{ width: props.width }}>
      {(props.small && field.label) ? <span className="input-group-text">{field.label}</span> : <></>}
      <StyledFormControl
        {...field.register ? {...field.register(props.attr, validationObject)} : (null)}
        type={props.type}
        className={"field form-control " + ((props.small) ? "small-mode" : "floating-mode")}
        style={{ width: props.width }}
        id={field.getId()}
        // placeholder={toCamelCase(props.attr)}
        placeholder={(props.placeholder && field.label) ? props.placeholder : ((props.small) ? "" : field.label)}
        onChange={field.update}
        min={props.min}
        max={props.max}
        step={props.step}
      />
      <StyledErrorMessage>
        {errors && errors[props.attr] ? errors[props.attr].message : ((fieldError.field === props.attr) ? fieldError.message : '')}
      </StyledErrorMessage>
      {(!props.small && field.label) ? <StyledLabel htmlFor="floatingInput">{field.label}</StyledLabel> : <></>}
    </div>
  );
}
