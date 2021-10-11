import { createRef, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { useModel } from '../model-context';

const StyledFormSelect = styled.select`
  margin-top: 10px;
  margin-bottom: 10px;
`;

// props: register, attr, label, options
export default function SelectField(props) {
  const { register, setValue } = useFormContext();
  const model = useModel();
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
    model.set(props.attr, value);
    setValue(props.attr, model.get(props.attr));

    if (props.onChange) {
      props.onChange(value);
    }
  };

  useEffect(() => {
    setValue(props.attr, model.get(props.attr));
  });

  return (
    <div ref={fieldRef}>
      <StyledFormSelect
        {...register(props.attr)}
        id={getId(props.attr)}
        className="field form-select form-select-lg mb-4"
        required={props.required}
        onChange={onChange}
      >
        {/* <option>{props.label}</option> */}
        {getOptions()}
      </StyledFormSelect>
    </div>
  );
}
