import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDialog } from '../../contexts/dialog-context';
import Button from '../controls/buttons/button';
import NumericField from '../controls/fields/input/numeric-field';
import Form from '../form';
import Icon from '../icon';
import withLoader from '../load-indicator';

const StyledTR = styled.tr`
  background-color: #FFFFFF;

  &.secondary {
    background-color: #F0F0F0;
  }
  
  &.header {
    background-color: #DDEEDD;
    color: #20B2AA;
  }
`;

const StyledTD = styled.td`
  border: 1px solid #dee2e6;
  vertical-align: middle;

  &.icon {
    width: 40px;
  }
`;

const StyledTH = styled.th`
  border: 1px solid #dee2e6;
  vertical-align: middle;
`;

const StyledCaption = styled.caption`
  background-color: #F0F0F0;
  .text {
    padding-left: 10px;
  }
`;

const StyledNavigatorContainer = styled.nav`
  display: inline-block;
  float: right;
`;

const StyledForm = styled(Form)`
  display: inline-flex;
  margin-bottom: 1rem;
`;

const StyledFooterData = styled.p`
  display: inline-block;
  float: left;
  margin-top: 5px;
`;

const StyledHeaderParagraph = styled.p`
  display: inline;
  float: left;
  padding-right: 3px;
  margin-bottom: 0px;
  margin-top: 4px;

  &.separation {
    padding-left: 5px;
  }
`;

const StyledNumericField = styled(NumericField)`
  display: inline;
  positiion: absolute;
`;

function Table(props) {
  const [rowObjects, setRowObjects] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [totalRows, setTotalRows] = useState(null);
  const [currentPagePosition, setCurrentPagePosition] = useState(0);
  const [previousPagePosition, setPreviousPagePosition] = useState(-1);
  const [model] = useState({ pageSize: (props.pageSize) ? props.pageSize : 10 });
  const dialog = useDialog();


  useEffect(() => {
    if (props.columnDefinitions) {
      props.columnDefinitions.map((columnDefinition) => {
        if (columnDefinition.dialogConfig) {
          dialog.setConfig(columnDefinition.dialogConfig);
        }
      });
    }
    else {
      console.error(
        "El componente de la tabla espera como parametro obligatorio columnDefinitions (definición de las columnas de la tabla)."
      );
    }
  }, []);

  useEffect(() => {
    update();
  }, [model, currentPagePosition, props.rowObjects]);
     
  useEffect(() => {
    if (dialog.getAfterConfirmationFlag()) {
      updateRowObjectsWithPaginator();
    }
  }, [dialog.getAfterConfirmationFlag()]);

  function update() {
    if (props.requestRowObjectsFunction) {
      updateRowObjectsWithPaginator();
    }
    else if (props.rowObjects) {
      updateRowObjects();
    }
    else {
      console.error(
        "El componente de la tabla espera como parametro rowObjects (lista de objetos) o " + 
        "requestRowObjectsFunction (funcion que llama al servicio que obtiene la lista de objetos)"
      );
    }
  }
  
  function calculateTotalPages(length) {
    let calculatedTotalPages = Math.ceil(length / model.pageSize) - 1;
    return (calculatedTotalPages < 0) ? 0 : calculatedTotalPages;
  }

  function updateRowObjectsWithPaginator() {
    if (props.requestRowObjectsFunction) { 
      props.requestRowObjectsFunction(currentPagePosition, model.pageSize).then((paginator) => {
        // Set current rowObjects
        const rowObjectsLength = paginator.length;
        const totalPagesLocal = calculateTotalPages(rowObjectsLength);
  
        setTotalRows(rowObjectsLength);
        setTotalPages(totalPagesLocal);
        
        if (currentPagePosition > totalPagesLocal) {
          setRowObjects(paginator.rowObjects);
          setCurrentPagePosition(totalPagesLocal);
        } else {
          setRowObjects(paginator.rowObjects);
        }
      });
    }
  }

  function updateRowObjects() {
    let pages = [];
    for (let index = 0; index < props.rowObjects.length; index += model.pageSize) {
      pages.push(props.rowObjects.slice(index, index + model.pageSize));        
    }

    const rowObjectsLength = props.rowObjects.length;
    const totalPagesLocal = calculateTotalPages(rowObjectsLength);

    setTotalRows(rowObjectsLength);
    setTotalPages(totalPagesLocal);

    if (currentPagePosition > totalPagesLocal) {
      setRowObjects(pages[totalPagesLocal]);
      setCurrentPagePosition(totalPagesLocal);
    } else {
      setRowObjects(pages[currentPagePosition]);
    }
  }

  function handleNext() {
    let nextPagePosition = currentPagePosition + 1;
    setPreviousPagePosition(currentPagePosition);
    setCurrentPagePosition((nextPagePosition > totalPages) ? totalPages : nextPagePosition);
  }
  
  function handleLast() {
    setPreviousPagePosition(currentPagePosition);
    setCurrentPagePosition(totalPages);
  }

  function handlePrevious() {
    let previousPagePositionLocal = currentPagePosition - 1;
    setPreviousPagePosition(currentPagePosition);
    setCurrentPagePosition((previousPagePositionLocal < 0) ? 0 : previousPagePositionLocal);
  }

  function handleFirst() {
    setPreviousPagePosition(currentPagePosition);
    setCurrentPagePosition(0);
  }
  
  function isNextEnable() {
    return currentPagePosition !== totalPages;
  }
  
  function isLastEnable() {
    return currentPagePosition !== totalPages;
  }

  function isPreviousEnable() {
    return currentPagePosition !== 0;
  }

  function isFirstEnable() {
    return currentPagePosition !== 0;
  }

  function paginatorButtonClass(isEnableFunction) {
    return "page-item " + ((!isEnableFunction()) ? "disabled" : "");
  }

  function isEmpty() {
    return (!rowObjects || (rowObjects && rowObjects.length === 0));
  }

  function buildEmptyCaption() {
    return (<StyledCaption><span className="text" >No hay datos</span></StyledCaption>);
  }

  function buildHeader() {
    let header;
    if (props.columnDefinitions) {
      header = (
        <thead>
          <StyledTR className="header" >
            {props.columnDefinitions.map((column) => (
              <StyledTH scope="col" key={column.key}>
                {column.label}
              </StyledTH>
            ))}
          </StyledTR>
        </thead>
      );
    }
    else {
      header = <></>;
    }
    return header;
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

    const onIconClick = (rowObjectLocal) => {
      if (columnDefinition.onClick) {
        columnDefinition.onClick(rowObjectLocal);
      }
      else if (columnDefinition.dialogConfig) {
        dialog.showDialog(rowObjectLocal);
      }
    }

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
          <StyledTD key={getRowKey(columnDefinition, rowObject)} className="icon" >
            <Icon
              fontName={columnDefinition.icon}
              medium
              onClick={onIconClick.bind(this, rowObject)}
            ></Icon>
          </StyledTD>
        );
        break;
    }

    return cell;
  }

  function buildBody() {
    const getTableRowClass = (index) => {
      return index % 2 !== 0 ? 'secondary' : '';
    };

    return (
      <tbody>
        {
          rowObjects.map((rowObject, index) => (
            <StyledTR key={rowObject.id} className={getTableRowClass(index)} >
              {
                props.columnDefinitions.map((columnDefinition) => 
                  (buildCell(columnDefinition, rowObject))
                )
              }
            </StyledTR>
          ))
        }
      </tbody>
    );
  }

  function buildFooter() {
    return [
      buildNavigator(),
      buildFooterData()
    ];
  }

  function buildFooterData() {
    let lastIndex = (currentPagePosition + 1) * model.pageSize;
    let showingTo = (lastIndex > totalRows) ? totalRows : lastIndex;
    let showingFrom = (lastIndex - model.pageSize) + 1;

    return (
      <StyledFooterData key="footer-data" >Mostrando del {showingFrom} al {showingTo} de un total de {totalRows} registros</StyledFooterData>
    );
  }

  function buildNavigator() {
    return (
      <StyledNavigatorContainer key="navigator" >
        <ul className="pagination justify-content-end">
          <li className={paginatorButtonClass(isFirstEnable)} onClick={handleFirst} >
            <Button className="page-link" label="Primero" left={<Icon fontName="chevron-double-left" small disabled={!isFirstEnable()} ></Icon>} disabled={!isFirstEnable()} ></Button>
          </li>
          <li className={paginatorButtonClass(isPreviousEnable)} onClick={handlePrevious} >
            <Button className="page-link" label="Anterior" left={<Icon fontName="chevron-left" small disabled={!isPreviousEnable()} ></Icon>} disabled={!isPreviousEnable()} ></Button>
          </li>
          {/*
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li> 
          */}
          <li className={paginatorButtonClass(isNextEnable)} onClick={handleNext} >
            <Button className="page-link" label="Siguiente" right={<Icon fontName="chevron-right" small disabled={!isNextEnable()} ></Icon>} disabled={!isNextEnable()} ></Button>
          </li>
          <li className={paginatorButtonClass(isLastEnable)} onClick={handleLast} >
            <Button className="page-link" label="Último" right={<Icon fontName="chevron-double-right" small disabled={!isLastEnable()} ></Icon>} disabled={!isLastEnable()} ></Button>
          </li>
        </ul>
      </StyledNavigatorContainer>
    )
  }

  function buildPageSizeChooser() {
    return (
      <StyledForm onSubmit={updateRowObjectsWithPaginator} model={model} >
        <StyledHeaderParagraph>Mostrar</StyledHeaderParagraph>
        <StyledNumericField attr="pageSize" label="Paginas" small width="50px" avoidValidations min='10' max='100' step='10' onChange={update} ></StyledNumericField>
        <StyledHeaderParagraph className="separation" >filas</StyledHeaderParagraph>
      </StyledForm>
    );
  }

  return (
    <div>
      {buildPageSizeChooser()}
      <table className="table table-hover">
        {buildHeader()}
        {isEmpty() ? buildEmptyCaption() : buildBody()}
      </table>
      {isEmpty() ? <></> : buildFooter()}
    </div>
  );
}

export default withLoader('rowObjects')(Table);