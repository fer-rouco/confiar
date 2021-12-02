
function buildAction(props) {
  return {
    key: props.key,
    label: props.label,
    icon: props.icon,
    action: props.action,
    color: props.color,
    focused: props.focused,
    enabled: props.enabled
  }
}

function buildAcceptAction(label, action) {
  return buildAction({
    key: 'accept',
    label,
    action,
    color: 'primary'
  });
}

function buildCancelAction(label, action) {
  return buildAction({
    key: 'cancel',
    label,
    action,
    color: 'secondary'
  });
}

function buildIconAction(key, icon, action) {
  return buildAction({
    key,
    icon,
    action,
    color: 'primary'
  });
}

export function acceptAction(actionFunction) {
  return buildAcceptAction('Aceptar', actionFunction);
}

export function yesAction(actionFunction) {
  return buildAcceptAction('Si', actionFunction);
}

export function cancelAction(actionFunction) {
  return buildCancelAction('Cancelar', actionFunction);
}

export function noAction(actionFunction) {
  return buildCancelAction('No', actionFunction);
}

export function addIconAction(actionFunction) {
  return buildIconAction('add', 'plus', actionFunction);
}

