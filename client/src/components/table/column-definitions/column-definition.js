import { removeActionDialogDefinition } from "../../dialog/dialog-definition";

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

export function enumColumnDefinition(props) {
  let definition = columnDefinition({...props, type: 'enum'});
  definition.options = props.options;
  return definition;
}

export function removeColumnDefinition(props) {
  let definition = iconColumnDefinition({...props, key: 'remove', icon: 'trash-fill'});
  definition.dialogDefinition = removeActionDialogDefinition(props.dialogDefinition);
  return definition;
}
