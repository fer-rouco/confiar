import { useEffect } from 'react';
import styled from 'styled-components';

// const DARK_COLOR = "black";
// const LIGHT_COLOR = "white";

const StyledIcon = styled.span((props) => {
  // const DARK_COLOR = "black";
  const LIGHT_COLOR = 'white';
  return `
    font-size: 25px;
    cursor: pointer;
    line-height: 100%;
    
    &:active {
      color: ${LIGHT_COLOR};
    }

    &.separation {
      padding: 8px;
    }
    
    &.small {
      font-size: 18px;
    }
    
    &.medium {
      font-size: 25px;
    }
    
    &.large {
      font-size: 35px;
    }
`;
});

/**
 *  Props:
 *    - fontName: the with wich the icon is identifiyed
 *    - color: the font color
 *    - size: you can use 3 diferent sizes: 'small', 'medium', 'large'. This parameter can be used in the form size='small'
 *            or directly adding the word to the tag like <Icon fontName='name' small />
 */
export default function Icon(props) {
  let size;

  if (props.small) {
    size = 'small';
  } else if (props.medium) {
    size = 'medium';
  } else if (props.large) {
    size = 'large';
  } else if (props.size) {
    size = props.size;
  }

  useEffect(() => {
    const iconElement = document.getElementsByClassName(
      'bi-' + props.fontName,
    )[0];
    if (iconElement) {
      const active = iconElement.parentElement.classList.contains('active');
      if (active) {
        iconElement.classList.add('active');
      } else {
        iconElement.classList.remove('active');
      }

      // iconElement.parentElement.onmouseover = () => {
      //   if (!active) {
      //     iconElement.style.color = LIGHT_COLOR;
      //   }
      // };
      // iconElement.parentElement.onmouseout = () => {
      //   if (!active) {
      //     iconElement.style.color = DARK_COLOR;
      //   }
      // };

      // if (active) {
      //   iconElement.style.color = LIGHT_COLOR;
      // }
      // else {
      //   iconElement.style.color = DARK_COLOR;
      // }
    }
  });

  return (
    <StyledIcon
      className={'icon separation bi bi-' + props.fontName + ' ' + size}
      style={{ color: props.color }}
      onClick={props.onClick}
    ></StyledIcon>
  );
}
