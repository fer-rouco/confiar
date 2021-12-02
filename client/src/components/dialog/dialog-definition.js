import { acceptAction, cancelAction, yesAction, noAction } from "../controls/action-definition";

export function dialogDefinition(props) {
  return {
    key: props.key,
    title: props.title,
    message: props.message,
    actions: props.actions,
    modeless: props.modeless,
    draggable: props.draggable,
    class: props.class
  }
}

export function acceptCancelDialogDefinition(props) {
  let definition = dialogDefinition(props);
  definition.actions = [cancelAction(props.onCancel), acceptAction(props.onAccept)];
  return definition;
}

export function yesNoDialogDefinition(props) {
  let definition = dialogDefinition(props);
  definition.actions = [noAction(props.onCancel), yesAction(props.onAccept)];
  return definition;
}

export function removeActionDialogDefinition(props) {
  let definition = dialogDefinition(props);
  definition.actions = [noAction(props.onCancel), yesAction(props.onAccept)];
  return definition;
}