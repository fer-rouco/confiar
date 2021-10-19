import { actionAccept, actionCancel, actionYes, actionNo } from "./action";

function dialogConfig(props) {
  return {
    key: props.key,
    title: props.title,
    modeless: props.modeless,
    draggable: props.draggable,
    class: props.class
  }
}

function messageDialogConfig(props) {
  let definition = dialogConfig(props);
  definition.message = props.message;
  return definition;
}

export function contentDialogConfig(props) {
  let definition = dialogConfig(props);
  definition.content = props.content;
  return definition;
}

export function actionsDialogConfig(props) {
  let definition = dialogConfig(props);
  definition.actions = props.actions;
  return definition;
}

export function acceptCancelDialogConfig(props) {
  let definition = messageDialogConfig(props);
  definition.actions = [actionCancel(props.onCancel), actionAccept(props.onAccept)];
  return definition;
}

export function yesNoDialogConfig(props) {
  let definition = messageDialogConfig(props);
  definition.actions = [actionNo(props.onCancel), actionYes(props.onAccept)];
  return definition;
}
