import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../icon';

const StyledTD = styled.td`
  vertical-align: middle;
`;

const StyledTH = styled.th`
  vertical-align: middle;
`;

export default function Table(props) {

  function buildHeader() {
    return (
      <thead>
        <tr>
          {props.columnDefinitions.map((column) => (
            <StyledTH className="table-success" scope="col" key={column.key}>
              {column.label}
            </StyledTH>
          ))}
        </tr>
      </thead>
    );
  }

  function buildCell(columnDefinition, rowObject) {
    let cell = null;
    const getRowKey = (column, rowObject) => {
      return column.key + '_' + rowObject.id;
    };
    const getRowObjectProperty = (column, rowObject) => {
      let rowObjectProperty;
      let splittedKey = columnDefinition.key.split('.')
      if (splittedKey.length === 1) {
        rowObjectProperty = rowObject[columnDefinition.key];
      }
      else {
        let currentProperty = rowObject;
        splittedKey.forEach((splittedKeyItem) => {
          currentProperty = currentProperty[splittedKeyItem];
        });
        rowObjectProperty = currentProperty;
      }
      return rowObjectProperty;
    };

    switch (columnDefinition.type) {
      case 'text':
        cell = (
          (columnDefinition.target) ?               
            <StyledTH key={getRowKey(columnDefinition, rowObject)}>
              <Link to={{ pathname: columnDefinition.target, state: rowObject }}>{getRowObjectProperty(columnDefinition, rowObject)}</Link>
            </StyledTH>
          :
            <StyledTD key={getRowKey(columnDefinition, rowObject)}>
              {getRowObjectProperty(columnDefinition, rowObject)}
            </StyledTD>
        );
        break;
      case 'icon':
        cell = (
          <StyledTD key={getRowKey(columnDefinition, rowObject)} >
            <Icon
              fontName={columnDefinition.icon}
              medium
              onClick={() => columnDefinition.onClick(rowObject)}
            ></Icon>
          </StyledTD>
        );
        break;
    }

    return cell;
  }

  function buildBody() {
    const getTableRowClass = (index) => {
      return index % 2 !== 0 ? 'table-secondary' : '';
    };

    return (
      <tbody>
        {
          props.rowObjects.map((rowObject, index) => (
            <tr key={rowObject.id} className={getTableRowClass(index)} >
              {
                props.columnDefinitions.map((columnDefinition) => 
                  (buildCell(columnDefinition, rowObject))
                )
              }
            </tr>
          ))
        }
      </tbody>
    );
  }

  function buildFooter() {
    // TODO: Paginator
  }

  return (
    <table className="table table-hover">
      {buildHeader()}
      {buildBody()}
      {buildFooter()}
    </table>
  );
}
