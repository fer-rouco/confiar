
function action(key, label, action, color, focused, enabled) {
  return {
    key,
    label,
    action,
    color,
    focused,
    enabled
  }
}

export function actionAccept(actionFunction) {
  return action(
    'accept',
    'Aceptar',
    actionFunction,
    'primary'
    );
}

export function actionYes(actionFunction) {
  return action(
    'yes',
    'Si',
    actionFunction,
    'primary'
    );
}

export function actionCancel(actionFunction) {
  return action(
    'cancel',
    'Cancelar',
    actionFunction,
    'secondary'
    );
}

export function actionNo(actionFunction) {
  return action(
    'no',
    'No',
    actionFunction,
    'secondary'
    );
}
