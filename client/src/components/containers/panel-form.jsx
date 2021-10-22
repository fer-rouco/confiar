import Form from './form';
import Panel from './panel';

export default function PanelForm(props) {
  return (
    <Panel {...props}>
      <Form {...props}>{props.children}</Form>
    </Panel>
  );
}
