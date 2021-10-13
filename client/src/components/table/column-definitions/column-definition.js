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

