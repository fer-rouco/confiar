import { Children, cloneElement, createRef, isValidElement, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { navigateIntoObjectByPath } from '../../theme';
import Icon from './../general/icon';
import withLoader from './../general/load-indicator';
import { usePage } from '../../contexts/page-context';

const getThemeAttribute = (theme, attrribute) => {
  return navigateIntoObjectByPath(theme, "components.containers.panel." + attrribute);
}

const StyledBoxShadow = css`
  box-shadow: 7px 7px 3px rgb(0 0 0 / 50%);
`;

const StyledBorder = css`
  border: 1px solid #CCC;
`;

const StyledContainer = styled.div`
  ${StyledBoxShadow};
  ${StyledBorder};

  border-radius: 25px;
  padding: 20px 20px 0 20px; // Top - Right - Bottom - Left
  background-color: ${({ theme }) => getThemeAttribute(theme, "body.bgColor")};
  color: ${({ theme }) => getThemeAttribute(theme, "body.color")};
  margin-bottom: 20px;

  &.small {
    width: 600px;
  }

  &.medium {
    width: 900px;
  }

  &.large {
    width: 1200px;
  }
`;

const StyledHeaderColor = css`
  background-color:  ${({ theme }) => getThemeAttribute(theme, "header.bgColor")};
  color:  ${({ theme }) => getThemeAttribute(theme, "header.color")};
`;

const StyledHeaderBorderRadius = css`
  ${StyledBorder};
  border-radius: 10px;
`;

const StyledHeaderBoxShadow = css`
  box-shadow: 5px 5px 3px rgb(0 0 0 / 50%);
`;

const StyledHeaderContainer = css`
  ${StyledHeaderColor};
  ${StyledHeaderBorderRadius};
  ${StyledHeaderBoxShadow};
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const StyledHeader = styled.div`
  ${StyledHeaderContainer};
  background-color:  ${({ theme }) => getThemeAttribute(theme, "header.firstStep.bgColor")};
  position: relative;
  margin-bottom: 20px;
  height: 68px;
`;

const StyledTitle = styled.h3`
  ${StyledHeaderContainer};
  position: absolute;
  font-family: cursive;
  display: inline;

  &.full-width {
    width: calc(100% - 20px);
  }

  &.with-action-width {
    width: calc(100% - 75px);
  }
`;

const StyledSubTitle = styled.h6`
  ${StyledHeaderContainer};
  position: relative;
  font-family: cursive;
  width: 100%;
  margin-bottom: 20px;
`;

const StyledAcctionsContainer = styled.div`
  position: absolute;
  margin-right: 10px;
  right: 0px;
  top: 6px;
  height: 50px;
  padding-left: 8px;
  padding-right: 8px;
`;

const StyledAcctionContainer = styled.div`
  ${StyledBorder};
  ${StyledHeaderBoxShadow};
  border-radius: 6px;
  margin-top: 8px;

  &:active {
    box-shadow: none;
    
    margin-top: 12px;
    margin-right: -4px;
  }
`;

// prop.size: "small", "medium", "large"
function Panel(props) {
  const panelRef = createRef();
  const titleRef = createRef();
  const [title, setTitle] = useState("");
  const { translation } = usePage();

  function getId() {
    let sufix = "main";
    if (props.id) {
      sufix = props.id;
    } else {
      let parent = panelRef.current?.parentElement.closest(".panel");
      if (parent) {
        sufix = "child" + Math.floor(Math.random() * 100);
      }
    }
    return sufix + ".panel";
  }

  function getTitle() {
    let title = null;
    if (props.hasOwnProperty('title') && props.title !== undefined) {
      title = props.title
    }
    else {
      title = translation(getId() + ".title");
    }
    return title;
  }

  function getClasses() {
    return ('panel container ' + ((props.size) ? props.size : '')).trim();
  }

  function buildActions() {
    let actions;
    if (props.actions) {
      actions = (
        <StyledAcctionsContainer>
          {props.actions.map((action, index) => (
            <StyledAcctionContainer className="btn-secondary" key={action.key} data-toggle="tooltip" title={translation(getId() + ".actions.tooltip." + action.key)} >
              <Icon fontName={action.icon} onClick={() => action.action()} medium noPadding ></Icon>
            </StyledAcctionContainer>
          ))}
        </StyledAcctionsContainer>
      );
    }
    return actions;
  }

  function buildTitle() {
    let titleDOM;
    if (!props.subTitle) {
      titleDOM = (
        <StyledHeader>
          <StyledTitle ref={titleRef} className="full-width">
            {title}
          </StyledTitle>
          {buildActions()}
        </StyledHeader>
      );
    }
    return titleDOM;
  }

  function buildSubTitle() {
    let subTitleDOM;
    if (props.subTitle) {
      subTitleDOM = (
        <StyledSubTitle className="full-width">
          {(props.subTitle.length > 0) ? props.subTitle :  title}
        </StyledSubTitle>
      );
    }
    return subTitleDOM;
  }

  function childrenWithProps() {
    return Children.map(props.children, child => {
      // Checking isValidElement is the safe way and avoids a typescript
      // error too.
      if (isValidElement(child)) {
        return cloneElement(child, { parent: getId() });
      }
      return child;
    });
  }

  useEffect(() => {
    // if(!props.id) {
    //   console.warn("The Panel sets a default id %s", getI18NextKey(), panelRef.current);
    // }

    if (titleRef.current && props.actions) {
      titleRef.current.classList.remove('full-width');
      titleRef.current.classList.add('with-action-width');
    }
  }, []);

  
  useEffect(() => {
    setTitle(getTitle());
  }, [props.title, translation]);
 
  return (
    <StyledContainer ref={panelRef} className={getClasses()} id={getId()}>
      <div className="row justify-content-center">
        <div>
          {buildTitle()}
          {buildSubTitle()}
          {childrenWithProps()}
        </div>
      </div>
    </StyledContainer>
  );
}

export default withLoader('model')(Panel);
