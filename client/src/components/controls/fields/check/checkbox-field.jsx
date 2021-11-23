import { createRef, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { usePage } from "../../../../contexts/page-context";
import { navigateIntoObjectByPath } from "../../../../theme";
import { useModel } from '../model-context';

const getThemeAttribute = (theme, attrribute) => {
  return navigateIntoObjectByPath(theme, "components.controls.fields.checkbox." + attrribute);
}

const StyledContainer = styled.div`
  margin-top: 8px;
`;

const StyledFormControl = styled.input`
  background-color: ${({ theme }) => getThemeAttribute(theme, "bgColor")};
  color: ${({ theme }) => getThemeAttribute(theme, "color")};
  margin-bottom: 20px;
`;

export default function CheckboxField(props) {
  const [label, setLabel] = useState("");
  const { register, setValue } = useFormContext();
  const [model, setModel] = useModel();
  const fieldRef = createRef();
  const { translation } = usePage();

  const getId = () => {
    let prefix = (props.type) ? props.type : 'checkbox';
    if (props.switch) {
      prefix = "switch";
    }
    return prefix + '-' + props.attr;
  };

  const getField = () => {
    return fieldRef.current.getElementsByClassName('checkbox')[0];
  };

  const getValue = () => {
    let field = getField();
    return field ? field.checked : null;
  };

  const getParentId = () => {
    const field = getField();
    return field.closest(".panel").id;
  };

  const getLabel = () => {
    return (props.hasOwnProperty('label') && props.label !== undefined) ? props.label : translation(getParentId() + "." + props.attr);
  }

  const onChange = () => {
    let value = getValue();

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

  useEffect(() => {
    setLabel(getLabel());
  }, [props.attr, translation]);

  useEffect(() => {
    if (setValue && model) {
      setValue(props.attr, model[props.attr]);
    }
  }, [setValue, props.attr, model]);

  return (
    <StyledContainer ref={fieldRef} className={"form-check " + ((props.switch) ? "form-switch" : "")} >
      <StyledFormControl 
        {...register ? {...register(props.attr)} : (null)}
        type={(props.type) ? props.type : 'checkbox'}
        className="checkbox form-check-input"
        id={getId()}
        onChange={onChange}
      />
      <label className="form-check-label" htmlFor={getId()} >
        {label}
      </label>
    </StyledContainer>
  );
}