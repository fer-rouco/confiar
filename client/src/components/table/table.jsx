import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import i18next from "i18next";
import debounce from 'lodash.debounce';
import useRoutesResolver from './../../hooks/routes-resolver';
import { useDialog } from '../../contexts/dialog-context';
import { usePage } from '../../contexts/page-context';
import Button from '../controls/buttons/button';
import NumericField from '../controls/fields/input/numeric-field';
import Form from '../containers/form';
import Icon from '../general/icon';
import withLoader from '../general/load-indicator-hoc';
import PanelForm from '../containers/panel-form';
import TextField from '../controls/fields/input/text-field';
import SelectField from '../controls/fields/select/select-field';
import storageManagerService from "./../../services/storage/storage-manager-service";
import { navigateIntoObjectByPath } from '../../theme';
import { useAlertMessage } from '../../contexts/alert-message-context';

const getThemeAttribute = (theme, attribute) => {
  return navigateIntoObjectByPath(theme, "components.table." + attribute);
}

const StyledTable = styled.table`
  margin-bottom: 20px;
`;

const StyledTR = styled.tr`
  background-color: ${({ theme }) => getThemeAttribute(theme, "cell.primary.bgColor")};

  &.secondary {
    background-color: ${({ theme }) => getThemeAttribute(theme, "cell.secondary.bgColor")};
  }
  
  &.header {
    background-color: ${({ theme }) => getThemeAttribute(theme, "header.bgColor")};
    color: ${({ theme }) => getThemeAttribute(theme, "header.color")};
  }
`;

const StyledTD = styled.td`
  border: 1px solid #dee2e6;
  vertical-align: middle;

  &.icon {
    width: 40px;
    color: ${({ theme }) => getThemeAttribute(theme, "cell.action.color")};
  }
`;

const StyledTH = styled.th`
  border: 1px solid #dee2e6;
  vertical-align: middle;
  & a {
    color: ${({ theme }) => getThemeAttribute(theme, "cell.head.color")};
  }
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
  & .pagination {
    margin-bottom: 0;
  }
`;

const StyledForm = styled(Form)`
  display: inline-flex;
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
  position: absolute;
`;

function Table(props) {
  const componentTranslation = i18next.getFixedT(null, 'components', 'table');
  const routesResolver = useRoutesResolver();
  const page = usePage();
  const pageTranslation = page.translation;
  const [rowObjects, setRowObjects] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [totalRows, setTotalRows] = useState(null);
  const localStorageService = storageManagerService();
  const localStorageObject = localStorageService.getItem(page.id);
  const [currentPagePosition, setCurrentPagePosition] = useState((localStorageObject && localStorageObject.currentPagePosition) ? localStorageObject.currentPagePosition : 0);
  const settingsState = useState({ pageSize: (props.pageSize) ? props.pageSize : ((localStorageObject && localStorageObject.pageSize) ? localStorageObject.pageSize : 10) });
  const [settings] = settingsState;
  const filtersState = useState({});
  const dialog = useDialog();
  const { addSuccessMessage, addErrorMessage } = useAlertMessage();
  
  useEffect(() => {
    if (props.columnDefinitions) {
      if (props.columnDefinitions.length > 0) {
        props.columnDefinitions.map((columnDefinition) => {
          if (columnDefinition.dialogDefinition) {
            dialog.setTranslationPrefixKey(getId());
            dialog.setDefinition(columnDefinition.dialogDefinition);
          }
        });
  
        update();
      }
    }
    else {
      console.error(
        "El componente de la tabla espera como parametro obligatorio columnDefinitions (definición de las columnas de la tabla)."
      );
    }
  }, [props.columnDefinitions]);

  useEffect(() => {
    localStorageService.setItem(page.id, { currentPagePosition: currentPagePosition, pageSize: settingsState[0].pageSize });
    update();
  }, [settings, currentPagePosition, props.rowObjects, filtersState[0]]);
     
  useEffect(() => {
    if (dialog.getAfterConfirmation()) {
      updateRowObjectsWithPaginator(filtersState);
      const translationKey = dialog.getTranslationPrefixKey().concat(".").concat(dialog.getTranslationActionKey()).concat(".success");
      const placeholderList = dialog.getDefinition().message.placeholders;
      let placeholdersToApply = {};
      if (placeholderList) {
        placeholderList.forEach(placeholder => {
          placeholdersToApply[placeholder] = dialog.getModel()[placeholder];
        });
      }
      addSuccessMessage(pageTranslation(translationKey, placeholdersToApply));
    }
  }, [dialog.getAfterConfirmation()]);
       
  useEffect(() => {
    if (dialog.getAfterConfirmationError()) {
      addErrorMessage(dialog.getAfterConfirmationError().message);
    }
  }, [dialog.getAfterConfirmationError()]);
  

  function getId() {
    return props.parent + "." + ((props.id) ? props.id : "main") + ".table";
  }

  function update() {
    if (props.requestRowObjectsFunction) {
        debouncedUpdateRowObjectsWithPaginator(filtersState);
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
    let calculatedTotalPages = Math.ceil(length / settings.pageSize) - 1;
    return (calculatedTotalPages < 0) ? 0 : calculatedTotalPages;
  }

  const debouncedUpdateRowObjectsWithPaginator = useCallback(
    debounce((filtersState) => updateRowObjectsWithPaginator(filtersState), 500),
    []
  );

  function updateRowObjectsWithPaginator(filtersState) {
    if (props.requestRowObjectsFunction && props.columnDefinitions.length > 0) { 
      let projectionFields = props.columnDefinitions.map((columnDefinition) => {
        return (columnDefinition.type != 'icon') ? columnDefinition.key : null
      }).filter((projectionField) => {
        return projectionField !== null; 
      });

      let filters = {};
      if (filtersState) {
        Object.entries(filtersState[0]).forEach((filterEntry) => {
          const filterValue = filterEntry[1];
          if (filterValue.length > 0) {
            const filterKey = filterEntry[0];
            const filterType = props.filterDefinitions.find((filterDef) => { return filterDef.key === filterKey }).type;
            filters[filterKey] = {
              type: filterType,
              value: filterValue
            };
          }
        });        
      }
      
      props.requestRowObjectsFunction(currentPagePosition, settings.pageSize, projectionFields, filters).then((paginator) => {
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
    for (let index = 0; index < props.rowObjects.length; index += settings.pageSize) {
      pages.push(props.rowObjects.slice(index, index + settings.pageSize));        
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
    setCurrentPagePosition((nextPagePosition > totalPages) ? totalPages : nextPagePosition);
  }
  
  function handleLast() {
    setCurrentPagePosition(totalPages);
  }

  function handlePrevious() {
    let previousPagePositionLocal = currentPagePosition - 1;
    setCurrentPagePosition((previousPagePositionLocal < 0) ? 0 : previousPagePositionLocal);
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
                {(column.hasOwnProperty('label') && column.label !== undefined) ? column.label : (pageTranslation) ? pageTranslation(getId() + ".header." + column.key) : ""}
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
          currentProperty = (currentProperty) ? currentProperty[splittedKeyItem] : null;
        });
        rowObjectProperty = currentProperty;
      }
      return rowObjectProperty;
    };

    const onIconClick = (rowObjectLocal) => {
      if (columnDefinition.onClick) {
        columnDefinition.onClick(rowObjectLocal);
      }
      else if (columnDefinition.dialogDefinition) {
        dialog.showDialog(rowObjectLocal);
      }
    }

    switch (columnDefinition.type) {
      case 'text':
        cell = (
          (columnDefinition.target) ?               
            <StyledTH key={getRowKey(columnDefinition, rowObject)}>
              <Link to={{ pathname: routesResolver.getUrl(columnDefinition.target) }} state={rowObject} >{getRowObjectProperty(columnDefinition, rowObject)}</Link>
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
            <Icon fontName={columnDefinition.icon} medium onClick={onIconClick.bind(this, rowObject)} ></Icon>
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
    let lastIndex = (currentPagePosition + 1) * settings.pageSize;
    let showingTo = (lastIndex > totalRows) ? totalRows : lastIndex;
    let showingFrom = (lastIndex - settings.pageSize) + 1;

    return (
      <StyledFooterData key="footer-data" >{componentTranslation("footer.showingTotalRows", {showingFrom, showingTo, totalRows})}</StyledFooterData>
    );
  }

  function buildNavigator() {
    return (
      <StyledNavigatorContainer key="navigator" >
        <ul className="pagination justify-content-end">
          <li className={paginatorButtonClass(isFirstEnable)} onClick={handleFirst} >
            <Button className="page-link" label={componentTranslation("footer.buttons.first")} left={<Icon fontName="chevron-double-left" small disabled={!isFirstEnable()} ></Icon>} disabled={!isFirstEnable()} ></Button>
          </li>
          <li className={paginatorButtonClass(isPreviousEnable)} onClick={handlePrevious} >
            <Button className="page-link" label={componentTranslation("footer.buttons.previous")} left={<Icon fontName="chevron-left" small disabled={!isPreviousEnable()} ></Icon>} disabled={!isPreviousEnable()} ></Button>
          </li>
          {/*
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li> 
          */}
          <li className={paginatorButtonClass(isNextEnable)} onClick={handleNext} >
            <Button className="page-link" label={componentTranslation("footer.buttons.next")} right={<Icon fontName="chevron-right" small disabled={!isNextEnable()} ></Icon>} disabled={!isNextEnable()} ></Button>
          </li>
          <li className={paginatorButtonClass(isLastEnable)} onClick={handleLast} >
            <Button className="page-link" label={componentTranslation("footer.buttons.last")} right={<Icon fontName="chevron-double-right" small disabled={!isLastEnable()} ></Icon>} disabled={!isLastEnable()} ></Button>
          </li>
        </ul>
      </StyledNavigatorContainer>
    )
  }

  function buildFilters() {
    let filtersDOM = null;
    
    if (props.filterDefinitions) {
      let filtersToBuild = [];

      props.filterDefinitions.map((filterDefinition) => {
        let filter = null;
        switch (filterDefinition.type) {
          case 'text':
            filter = (
              <TextField attr={filterDefinition.key} label={filterDefinition.label} avoidValidations ></TextField>
            );
            break;
          case 'enum':
            filter = (
              <SelectField attr={filterDefinition.key} label={filterDefinition.label} options={filterDefinition.options} ></SelectField>
            );
            break;
        }
        if (filter) {
          filtersToBuild.push(filter)
        }
      });

      const buildFilter = (filterItemToBuild) => (
        (filterItemToBuild) ? (
          <div className="col-md-4" >
            {filterItemToBuild}
          </div>
        ) : (
          <></>
        )
      );

      let rows = [];
      for (let filtersToBuildIndex = 0; filtersToBuildIndex < filtersToBuild.length; filtersToBuildIndex += 3) {
        const filterToBuild0 = filtersToBuild[filtersToBuildIndex];
        const filterToBuild1 = filtersToBuild[filtersToBuildIndex + 1];
        const filterToBuild2 = filtersToBuild[filtersToBuildIndex + 2];
        rows.push(
          <div className="row" key={"filter-row-" + filtersToBuildIndex} >
            {buildFilter(filterToBuild0)}
            {buildFilter(filterToBuild1)}
            {buildFilter(filterToBuild2)}
          </div>      
        )
      }

      filtersDOM = (
        <PanelForm subTitle={componentTranslation("filters.title")} model={filtersState} id={getId() + ".filters"} >
          { rows.map((row) => (row)) }
        </PanelForm>
      )  
    }
    else {
      filtersDOM = (<></>)
    }
    return filtersDOM;
  }

  function buildPageSizeChooser() {
    return (
      <StyledForm onSubmit={updateRowObjectsWithPaginator} model={settingsState} id={getId() + ".page-size"} >
        <StyledHeaderParagraph>{componentTranslation("header.show")}</StyledHeaderParagraph>
        <StyledNumericField attr="pageSize" small width="55px" avoidValidations min='10' max='100' step='10' label="" ></StyledNumericField>
        <StyledHeaderParagraph className="separation" >{componentTranslation("header.rows")}</StyledHeaderParagraph>
      </StyledForm>
    );
  }

  return (
    <div>
      {buildFilters()}
      {buildPageSizeChooser()}
      <StyledTable className="table table-hover">
        {buildHeader()}
        {isEmpty() ? buildEmptyCaption() : buildBody()}
      </StyledTable>
      {isEmpty() ? <></> : buildFooter()}
    </div>
  );
}

export default withLoader('rowObjects')(Table);