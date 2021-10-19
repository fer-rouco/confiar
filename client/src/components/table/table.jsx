import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDialog } from '../../contexts/dialog-context';
import Button from '../controls/buttons/button';
import SelectField from '../controls/fields/select/select-field';
import Icon from '../icon';
import withLoader from '../load-indicator';

// const StyledContainer = styled.div`
//   position: relative;
//   border-radius: 3px;
//   background: #ffffff;
//   border-top: 3px solid #d2d6de;
//   width: 100%;
//   box-shadow: 0 1px 1px rgb(0 0 0 / 10%);
//   padding: 5px 5px 0.1px 5px;
// `;

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

const StyledFooterData = styled.p`
  display: inline-block;
  float: left;
  margin-top: 5px;
`;

function Table(props) {
  const [rowObjectsCache, setRowObjectsCache] = useState([]);
  const [rowObjects, setRowObjects] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [totalRows, setTotalRows] = useState(null);
  const [currentPagePosition, setCurrentPagePosition] = useState(0);
  const [previousPagePosition, setPreviousPagePosition] = useState(-1);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const dialog = useDialog();
  let pageSize = 3;

  useEffect(() => {
    props.columnDefinitions.map((columnDefinition) => {
      if (columnDefinition.dialogConfig) {
        dialog.setConfig(columnDefinition.dialogConfig);
      }
    });  
  }, []);

  useEffect(() => {
    updateRowObjects();
    setShouldUpdate(false);
  }, [currentPagePosition, props.rowObjects]);

  useEffect(() => {
    // this shouldUpdate stuff was made to avoid call updateRowObjects two times when the page load.
    if (shouldUpdate) {
      setRowObjectsCache([]);
      updateRowObjects();
      dialog.setActionExecuted(false);
    }
    setShouldUpdate(true);
  }, [dialog.getActionExecuted()]);
  
  function calculateTotalPages(length) {
    let calculatedTotalPages = Math.ceil(length / pageSize) - 1;
    return (calculatedTotalPages < 0) ? 0 : calculatedTotalPages;
  }

  function setTableStates(rowObjectsParam, length) {
    setTotalRows(length);
    setTotalPages(calculateTotalPages(length));
    setRowObjects(rowObjectsParam);
  }

  function requestRowObjects() {
    props.requestRowObjectsFunction(currentPagePosition, pageSize).then((paginator) => {
      // Set current rowObjects
      setTableStates(paginator.rowObjects, paginator.length);
    });
  }

  function requestRowObjectsForCache(jumpPages) {
    // Set Previous rowObjects in cache
    if ((currentPagePosition > previousPagePosition) && !jumpPages) {
      rowObjectsCache[0] = rowObjects;
    }
    else {
      if ((currentPagePosition - 1) >= 0) {
        props.requestRowObjectsFunction(currentPagePosition - 1, pageSize).then((paginatorForPreviousPage) => {
          rowObjectsCache[0] = paginatorForPreviousPage.rowObjects;
        });
      }
      else {
        rowObjectsCache[0] = null;
      }
    }
    
    // Set Next rowObjects in cache
    if ((currentPagePosition < previousPagePosition) && !jumpPages) {
      rowObjectsCache[1] = rowObjects;
    }
    else {
      if (((currentPagePosition + 1) <= totalPages) || (totalPages === null)) {
        props.requestRowObjectsFunction(currentPagePosition + 1, pageSize).then((paginatorForPreviousPage) => {
          rowObjectsCache[1] = paginatorForPreviousPage.rowObjects;
        });
      }
      else {
        rowObjectsCache[1] = null;
      }
    }
  }

  function updateRowObjects() {
    if (props.requestRowObjectsFunction) {
      let jumpPages = Math.abs(previousPagePosition - currentPagePosition) !== 1;
      if (previousPagePosition > -1 && !jumpPages) {
        // Previous -> rowObjectsCache index 0
        if (currentPagePosition < previousPagePosition) {
          setRowObjects(rowObjectsCache[0]);
        }
        // Next -> rowObjectsCache index 1
        if (currentPagePosition > previousPagePosition) {
          setRowObjects(rowObjectsCache[1]);
        }
      }
      else {
        requestRowObjects();
      }
      requestRowObjectsForCache(jumpPages);
    }
    else {
      let pages = [];
      for (let index = 0; index < props.rowObjects.length; index += pageSize) {
        pages.push(props.rowObjects.slice(index, index + pageSize));        
      }

      setTableStates(pages[currentPagePosition], props.rowObjects.length);
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
    let previousPagePosition = currentPagePosition - 1;
    setPreviousPagePosition(currentPagePosition);
    setCurrentPagePosition((previousPagePosition < 0) ? 0 : previousPagePosition);
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
    return (
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

    const onIconClick = (model) => {
      if (columnDefinition.onClick) {
        columnDefinition.onClick(model)
      }
      else if (columnDefinition.dialogConfig) {
        dialog.showDialog(model);
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
    let lastIndex = (currentPagePosition + 1) * pageSize;
    let showingTo = (lastIndex > totalRows) ? totalRows : lastIndex;
    let showingFrom = (lastIndex - pageSize) + 1;

    return (
      <StyledFooterData key="footer-data" >Mostrando del {showingFrom} al {showingTo} de {totalRows} registros</StyledFooterData>
    );
  }

  function buildNavigator() {
    return (
      <StyledNavigatorContainer key="navigator" >
        {/* <SelectField
          attr='pageSize'
          label='Page Size'
          options={[
            {value: 10, label: "10" },
            {value: 20, label: "20" },
            {value: 30, label: "30" },
            {value: 40, label: "40" },
            {value: 50, label: "50" }
          ]}
          required
        ></SelectField> */}

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

  return (
    <div>
      <table className="table table-hover">
        {buildHeader()}
        {isEmpty() ? buildEmptyCaption() : buildBody()}
      </table>
      {isEmpty() ? <></> : buildFooter()}
    </div>
  );
}

export default withLoader('rowObjects')(Table);