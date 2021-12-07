import styled from "styled-components";
import { navigateIntoObjectByPath } from "../../../../theme";
import baseField from "../base-field";

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
    
  const getType = () => {
    let type = (props.type) ? props.type : 'checkbox';
    if (props.switch) {
      type = "switch";
    }
    return type;
  };
  
  const field = baseField({...props, type: getType(), valueProperty: 'checked'});

  field.useEffect();

  return (
    <StyledContainer ref={field.ref} className={"form-check " + ((props.switch) ? "form-switch" : "")} >
      <StyledFormControl 
        {...field.register ? {...field.register(props.attr)} : (null)}
        type={(props.type) ? props.type : 'checkbox'}
        className="field form-check-input"
        id={field.getId()}
        onChange={field.update}
      />
      <label className="form-check-label" htmlFor={field.getId()} >
        {field.label}
      </label>
    </StyledContainer>
  );
}