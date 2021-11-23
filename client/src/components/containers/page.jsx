import { PageProvider } from '../../contexts/page-context';

export default function Page(props) {
  return (
    <PageProvider id={props.id}>
      <div className="page" >
        {props.children}
      </div>
    </PageProvider>
  );
}
