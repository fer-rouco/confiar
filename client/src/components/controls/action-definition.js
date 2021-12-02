
function buildAction(key, label, action, color, focused, enabled) {
  return {
    key,
    label,
    action,
    color,
    focused,
    enabled
  }
}

function buildActionAccept(label, actionFunction) {
  return buildAction(
    'accept',
    label,
    actionFunction,
    'primary'
  );
}

function buildActionCancel(label, actionFunction) {
  return buildAction(
    'cancel',
    label,
    actionFunction,
    'secondary'
  );
}
export function actionAccept(actionFunction) {
  return buildActionAccept('Aceptar', actionFunction);
}

export function actionYes(actionFunction) {
  return buildActionAccept('Si', actionFunction);
}

export function actionCancel(actionFunction) {
  return buildActionCancel('Cancelar', actionFunction);
}

export function actionNo(actionFunction) {
  return buildActionCancel('No', actionFunction);
}
