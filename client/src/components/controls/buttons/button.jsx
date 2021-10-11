export default function Button(props) {
  const getType = () => {
    return props.type ? props.type : 'button';
  };

  const getClasses = () => {
    let classes = 'btn ' + (props.className ? props.className + ' ' : ' ');
    let color = (props.defaultColor !== undefined) ? props.defaultColor : 'btn-primary';
    let size;
    let close;

    color = props.primary ? 'btn-primary' : color;
    color = props.secondary ? 'btn-secondary' : color;
    color = props.success ? 'btn-success' : color;
    color = props.danger ? 'btn-danger' : color;
    color = props.warning ? 'btn-warning' : color;
    color = props.info ? 'btn-info' : color;
    color = props.light ? 'btn-light' : color;
    color = props.dark ? 'btn-dark' : color;
    color = props.link ? 'btn-link' : color;

    size = props.large ? 'btn-lg' : '';
    size = props.small ? 'btn-sm' : '';

    close = props.close ? 'btn-close' : '';

    classes += (close ? close : color) + ' ' + size + ' ';

    return classes.trim();
  };

  return (
    <button type={getType()} className={getClasses()} disabled={props.disabled} onClick={props.onClick} >
      {props.label}
    </button>
  );
}
