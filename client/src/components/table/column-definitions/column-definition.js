import { yesNoDialogDefinition } from "../../dialog/dialog-definition";

function columnDefinition(props) {
  return {
    key: props.key,
    type: props.type,
    label: props.label,
    onClick: props.onClick,
    icon: props.icon,
    target: props.target
  }
}

export function textColumnDefinition(props) {
  return columnDefinition({...props, type: 'text', target: props.target});
}

export function iconColumnDefinition(props) {
  return columnDefinition({...props, type: 'icon', icon: props.icon});
}

export function removeColumnDefinition(props) {
  let column = iconColumnDefinition({...props, key: 'remove', icon: 'trash-fill'});
  column.dialogDefinition = yesNoDialogDefinition(props.dialogDefinition);
  return column;
}
