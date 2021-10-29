import { createRef, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { useModel } from '../model-context';

const StyledFormSelect = styled.select`
  &.form-select {
    height: 40px;
    padding-top: 14px !important;
    padding-bottom: 8px !important;
    margin-bottom: 20px !important;
    font-size: 1rem;
    padding-left: 0.75rem;
  }

  &.form-select:focus, &.form-select:not(:placeholder-shown) {
    padding-top: 1.25rem;
  }

  &.form-select ~ label {
    padding-top: 8px;
  }
  
  &.form-select:focus ~ label, &.form-select:not(:placeholder-shown) ~ label {
    opacity: 0.50;
    transform: scale(0.70) translateY(-0.5rem) translateX(0.30rem);
  }
`;

// props: register, attr, label, options
export default function SelectField(props) {
  const { register, setValue } = useFormContext();
  const [model, setModel] = useModel();
  const fieldRef = createRef();

  const getId = () => {
    return 'select-' + props.attr;
  };

  const getField = () => {
    return fieldRef.current.getElementsByClassName('field')[0];
  };

  const getValue = () => {
    let field = getField();
    return field ? field.value : null;
  };

  const getOptions = () => {
    return props.options.map((option) => (
      <option value={option.value} key={option.value}>
        {option.label}
      </option>
    ));
  };

  const onChange = () => {
    let value = getValue();

    model[props.attr] = value;

    let modelCopy = Object.assign({}, model);
    modelCopy[props.attr] = value;
    setModel(modelCopy);
    if (setValue) {
      setValue(props.attr, value);
    }

    if (props.onChange) {
      props.onChange(value);
    }
  };

  useEffect(() => {
    if (setValue && model) {
      setValue(props.attr, model[props.attr]);
    }
  }, [setValue, props.attr, model]);

  return (
    <div ref={fieldRef} className="form-floating" >
      <StyledFormSelect
        {...register ? {...register(props.attr)} : (null)}
        id={getId(props.attr)}
        className="field form-select form-select-lg mb-4"
        required={props.required}
        onChange={onChange}
      >
        {/* <option>{props.label}</option> */}
        {getOptions()}
      </StyledFormSelect>
      <label htmlFor="floatingInput">{props.label}</label>
    </div>
  );
}
