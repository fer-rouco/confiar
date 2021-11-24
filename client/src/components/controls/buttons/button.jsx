import { createRef, useEffect, useState } from "react";
import styled from "styled-components";
import { usePage } from "../../../contexts/page-context";

const StyledButton = styled.button((props) => {
  return `
    margin-bottom: 20px;

    &.disabled {
      opacity: 40%;
    }
  `;
});

export default function Button(props) {
  const [label, setLabel] = useState("");
  const buttonRef = createRef();
  const { translation } = usePage();

  const getType = () => {
    return props.type ? props.type : 'button';
  };

  const getClasses = () => {
    let classes = 'btn ' + (props.className ? props.className + ' ' : ' ');
    let color = (props.defaultColor) ? props.defaultColor : 'btn-primary';
    let size;
    let close;

    if (!props.defaultColor) {
      if (!props.color) {
        color = props.primary ? 'btn-primary' : color;
        color = props.secondary ? 'btn-secondary' : color;
        color = props.success ? 'btn-success' : color;
        color = props.danger ? 'btn-danger' : color;
        color = props.warning ? 'btn-warning' : color;
        color = props.info ? 'btn-info' : color;
        color = props.light ? 'btn-light' : color;
        color = props.dark ? 'btn-dark' : color;
        color = props.link ? 'btn-link' : color;
      }
      else {
        color = "btn-" + props.color;
      }
    }

    size = props.large ? 'btn-lg' : '';
    size = props.small ? 'btn-sm' : '';

    close = props.close ? 'btn-close' : '';

    classes += (close ? close : color) + ' ' + size + ' ';

    if (props.disabled) {
      classes += 'disabled';
    }

    return classes.trim();
  };

  const getButton = () => {
    return buttonRef.current;
  };

  const getParentId = () => {
    const button = getButton();
    return button.closest(".panel")?.id;
  };

  const getLabel = () => {
    return (props.hasOwnProperty('label') && props.label !== undefined) ? props.label : (translation) ? translation(getParentId() + "." + props.attr) : "";
  }
  
  useEffect(() => {
    setLabel(getLabel());
  }, [props.label, translation]);

  return (
    <StyledButton type={getType()} className={getClasses()} disabled={props.disabled} ref={buttonRef} onClick={props.onClick} onKeyPress={props.onKeyPress} >
      {props.left}
      {label}
      {props.right}
    </StyledButton>
  );
}
