import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../controls/buttons/button';
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
  const [rowObjects, setRowObjects] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [totalRows, setTotalRows] = useState(null);
  const [currentPagePosition, setCurrentPagePosition] = useState(0);
  let pageSize = 3;

  useEffect(() => {
    updateRowObjects();
  }, [currentPagePosition]);

  function updateRowObjects() {
    const calculateTotalPages = (length) => {
      let calculatedTotalPages = Math.round(length / pageSize) - 1;
      return (calculatedTotalPages < 0) ? 0 : calculatedTotalPages;
    }

    if (props.requestRowObjectsFunction) {
      props.requestRowObjectsFunction(currentPagePosition, pageSize).then((paginator) => {
        setTotalRows(paginator.length);
        setTotalPages(calculateTotalPages(paginator.length));
        setRowObjects(paginator.rowObjects);
      });
    }
    else {
      setTotalRows(props.rowObjects.length);
      setTotalPages(calculateTotalPages(props.rowObjects.length));

      // TODO: Fix this stuff.
      let lastIndex = (currentPagePosition + 1) * pageSize;
      let showingFrom = (lastIndex - pageSize) + 1;

      var rowObjectsCopy = Object.assign([], props.rowObjects);
      if (pageSize < props.rowObjects.length) {
        rowObjectsCopy.splice(showingFrom -1, pageSize)
      }

      setRowObjects(rowObjectsCopy);
    }
  }

  function handleNext() {
    let nextPagePosition = currentPagePosition + 1;
    setCurrentPagePosition((nextPagePosition > totalPages) ? totalPages : nextPagePosition);
  }
  
  function handleLast() {
    setCurrentPagePosition(totalPages);
  }

  function handlePrevious() {
    let previousPagePosition = currentPagePosition - 1;
    setCurrentPagePosition((previousPagePosition < 0) ? 0 : previousPagePosition);
  }

  function handleFirst() {
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
    return (<StyledCaption>No hay datos</StyledCaption>);
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
        <ul className="pagination justify-content-end">
          <li className={paginatorButtonClass(isFirstEnable)} onClick={handleFirst} >
            <Button className="page-link" label="Primero" left={<Icon fontName="chevron-double-left" small ></Icon>} ></Button>
          </li>
          <li className={paginatorButtonClass(isPreviousEnable)} onClick={handlePrevious} >
            <Button className="page-link" label="Anterior" left={<Icon fontName="chevron-left" small ></Icon>}></Button>
          </li>
          {/*
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li> 
          */}
          <li className={paginatorButtonClass(isNextEnable)} onClick={handleNext} >
            <Button className="page-link" label="Siguiente" right={<Icon fontName="chevron-right" small ></Icon>}></Button>
          </li>
          <li className={paginatorButtonClass(isLastEnable)} onClick={handleLast} >
            <Button className="page-link" label="Último" right={<Icon fontName="chevron-double-right" small ></Icon>} ></Button>
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