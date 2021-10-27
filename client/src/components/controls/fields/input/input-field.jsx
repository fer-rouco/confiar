import { createRef, useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useError } from '../../../../contexts/error-context';
import { toCamelCase } from '../../../../utils/string-utils';
import styled from 'styled-components';
import { useModel } from '../model-context';

const StyledErrorMessage = styled.div`
  color: red;
  padding-left: 20px;
  font-size: 10px;
  position: absolute;
  top: 60px;
`;

const StyledFormControl = styled.input`

  &.floating-mode {
    height: 40px;
    margin-bottom: 8px;
  }

  &.small-mode:not(:placeholder-shown) {
    padding: 4px;
    margin: 0;
  }

  &.form-control:focus, &.form-control:not(:placeholder-shown) {
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

// props: register, type, attr, label, required, validationObject
export default function InputField(props) {
  const { register, setValue, formState: { errors } } = useFormContext();
  const [model, setModel] = useModel();
  const fieldRef = createRef();
  const { fieldError } = useError();

  const getId = () => {
    return 'input-' + props.attr;
  };

  const getField = useCallback(() => {
    return fieldRef.current.getElementsByClassName('field')[0];
  }, [fieldRef]);

  const getValue = useCallback(() => {
    let field = getField();
    return field ? field.value : null;
  }, [getField]);

  const updateField = () => {
    let rawValue = getValue();
    let value;
    
    if (props.type === 'number') {
      value = Number.parseFloat(rawValue);
    }
    else {
      value = rawValue;
    }

    let modelCopy = Object.assign({}, model);
    modelCopy[props.attr] = value;
    setModel(modelCopy);
    if (setValue) {
      setValue(props.attr, value);
    }
    
    if (props.onChange) {
      props.onChange();
    }
  };

  const cleanErrorClasses = useCallback(() => {
    let field = getField();
    if (field) {
      field.classList.remove('is-invalid');
      field.classList.remove('is-valid');
    }
  }, [getField]);

  const updateErrorClasses = useCallback(() => {
    let field = getField();
    if (field) {
      if ((errors && errors[props.attr]) || fieldError.field === props.attr) {
        field.classList.add('is-invalid');
      } else {
        field.classList.add('is-valid');
      }
    }
  }, [getField, errors, fieldError, props.attr]);

  const handleErrorClasses = useCallback(() => {
    if (!props.avoidValidations) {
      if (getValue()) {
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
  }, [getValue, cleanErrorClasses, updateErrorClasses, errors, props.attr]);

  useEffect(() => {
    if (setValue && model) {
      setValue(props.attr, model[props.attr]);
    }
  }, [setValue, props.attr, model]);

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
    <div className={(!props.small) ? "form-floating" : "input-group mb-3" } ref={fieldRef} style={{ width: props.width }}>
      {(props.small && props.label) ? <span className="input-group-text">{props.label}</span> : <></>}
      <StyledFormControl
        {...register ? {...register(props.attr, validationObject)} : (null)}
        type={props.type}
        className={"field form-control " + ((props.small) ? "small-mode" : "floating-mode")}
        style={{ width: props.width }}
        id={getId()}
        // placeholder={toCamelCase(props.attr)}
        placeholder={(props.placeholder) ? props.placeholder : ((props.small) ? "" : props.label)}
        onChange={updateField}
        min={props.min}
        max={props.max}
        step={props.step}
      />
      <StyledErrorMessage>
        {errors && errors[props.attr] ? errors[props.attr].message : ((fieldError.field === props.attr) ? fieldError.message : '')}
      </StyledErrorMessage>
      {(!props.small && props.label) ? <label htmlFor="floatingInput">{props.label}</label> : <></>}
    </div>
  );
}
