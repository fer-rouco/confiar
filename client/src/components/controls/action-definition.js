
function buildAction(props) {
  return {
    key: props.key,
    icon: props.icon,
    action: props.action,
    color: props.color,
    focused: props.focused,
    enabled: props.enabled
  }
}

function buildAcceptAction(action) {
  return buildAction({
    key: 'accept',
    action,
    color: 'primary'
  });
}

function buildCancelAction(action) {
  return buildAction({
    key: 'cancel',
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
  return buildAcceptAction(actionFunction);
}

export function yesAction(actionFunction) {
  return buildAcceptAction(actionFunction);
}

export function cancelAction(actionFunction) {
  return buildCancelAction(actionFunction);
}

export function noAction(actionFunction) {
  return buildCancelAction(actionFunction);
}

export function addIconAction(actionFunction) {
  return buildIconAction('add', 'plus', actionFunction);
}

