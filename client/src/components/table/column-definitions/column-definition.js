import { yesNoDialogDefinition } from "../../dialog/dialog-definition";

function columnDefinition(props) {
  return {
    key: props.key,
    type: props.type,
    label: props.label,
    onClick: props.onClick
  }
}

export function textColumnDefinition(props) {
  let column = columnDefinition(props);
  column.type = 'text';
  column.target = props.target;
  return column;
}

export function iconColumnDefinition(props) {
  let column = columnDefinition(props);
  column.type = 'icon';
  column.icon = props.icon;
  return column;
}

export function removeColumnDefinition(props) {
  let column = iconColumnDefinition(props);
  column.type = 'icon';
  column.icon = 'trash-fill';
  column.dialogDefinition = yesNoDialogDefinition(props.dialogDefinition);
  return column;
}
