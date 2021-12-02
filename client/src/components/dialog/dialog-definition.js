import { actionAccept, actionCancel, actionYes, actionNo } from "../controls/action-definition";

function dialogDefinition(props) {
  return {
    key: props.key,
    title: props.title,
    modeless: props.modeless,
    draggable: props.draggable,
    class: props.class
  }
}

function messageDialogDefinition(props) {
  let definition = dialogDefinition(props);
  definition.message = props.message;
  return definition;
}

export function contentDialogDefinition(props) {
  let definition = dialogDefinition(props);
  definition.content = props.content;
  return definition;
}

export function actionsDialogDefinition(props) {
  let definition = dialogDefinition(props);
  definition.actions = props.actions;
  return definition;
}

export function acceptCancelDialogDefinition(props) {
  let definition = messageDialogDefinition(props);
  definition.actions = [actionCancel(props.onCancel), actionAccept(props.onAccept)];
  return definition;
}

export function yesNoDialogDefinition(props) {
  let definition = messageDialogDefinition(props);
  definition.actions = [actionNo(props.onCancel), actionYes(props.onAccept)];
  return definition;
}
