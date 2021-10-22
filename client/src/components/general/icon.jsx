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

    &.disabled {
      opacity: 40%;
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

  function getClasses() {
    const SPACE = ' ';
    let classes = 'icon bi bi-' + props.fontName + SPACE;

    if (props.small) {
      classes += 'small' + SPACE;
    } else if (props.medium) {
      classes += 'medium' + SPACE;
    } else if (props.large) {
      classes += 'large' + SPACE;
    } else if (props.size) {
      classes += props.size + SPACE;
    }

    if (props.disabled) {
      classes += 'disabled' + SPACE;
    }

    if (!props.noPadding) {
      classes += 'separation';
    }

    return classes.trim();
  }

  return (
    <StyledIcon
      className={getClasses()}
      style={{ color: props.color }}
      onClick={props.onClick}
    ></StyledIcon>
  );
}
