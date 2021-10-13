
function action(id, label, action, color, focused, enabled) {
  return {
    id,
    label,
    action,
    color,
    focused,
    enabled
  }
}

export function actionAccept() {
  return action(
    'accept',
    'Aceptar',
    () => { console.log("Aceptado!!!"); },
    'primary'
    );
}

export function actionYes() {
  return action(
    'yes',
    'Si',
    () => { console.log("Yeees!!!"); },
    'primary'
    );
}

export function actionCancel() {
  return action(
    'cancel',
    'Cancelar',
    () => { console.log("Cancelado!!!"); },
    'secondary'
    );
}

export function actionNo() {
  return action(
    'no',
    'No',
    () => { console.log("Noooo!!!"); },
    'secondary'
    );
}
