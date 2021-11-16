import { createRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { navigateIntoObjectByPath } from '../../theme';
import Icon from './../general/icon';
import withLoader from './../general/load-indicator';

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
  background-color: ${({ theme }) => navigateIntoObjectByPath(theme, "body.background")};
  color: ${({ theme }) => navigateIntoObjectByPath(theme, "body.text")};
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
  background-color:  ${({ theme }) => navigateIntoObjectByPath(theme, "header.background")};
  color:  ${({ theme }) => navigateIntoObjectByPath(theme, "header.text")};
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
  background-color:  ${({ theme }) => navigateIntoObjectByPath(theme, "header.firstStep.background")};
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
  const titleRef = createRef();

  useEffect(() => {
    if (props.actions) {
      titleRef.current.classList.remove('full-width');
      titleRef.current.classList.add('with-action-width');
    }
  }, []);

  function getClasses() {
    return ('container panel-container ' + ((props.size) ? props.size : '')).trim();
  }

  function buildActions() {
    let actions;
    if (props.actions) {
      actions = (
        <StyledAcctionsContainer>
          {props.actions.map((action, index) => (
            <StyledAcctionContainer
              className="btn-secondary"
              key={action.key}
              data-toggle="tooltip"
              title={action.tooltip}
            >
              <Icon
                fontName={action.icon}
                onClick={() => action.action()}
                medium
                noPadding
              ></Icon>
            </StyledAcctionContainer>
          ))}
        </StyledAcctionsContainer>
      );
    }
    return actions;
  }

  function buildTitle() {
    let title;
    if (props.title) {
      title = (
        <StyledHeader>
          <StyledTitle ref={titleRef} className="full-width">
            {props.title}
          </StyledTitle>
          {buildActions()}
        </StyledHeader>
      );
    }
    return title;
  }

  function buildSubTitle() {
    let subTitle;
    if (props.subTitle) {
      subTitle = (
        <StyledSubTitle className="full-width">
          {props.subTitle}
        </StyledSubTitle>
      );
    }
    return subTitle;
  }

  return (
    <StyledContainer className={getClasses()}>
      <div className="row justify-content-center">
        <div>
          {buildTitle()}
          {buildSubTitle()}
          {props.children}
        </div>
      </div>
    </StyledContainer>
  );
}

export default withLoader('model')(Panel);
