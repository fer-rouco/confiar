import { createPopper } from '@popperjs/core';
import { createRef, useEffect } from 'react';
import styled from 'styled-components';

const StyledTooltipContainer = styled.div`
  display: inline-block;
  background: #ffffff;
  color: #643045;
  font-weight: bold;
  padding: 5px 10px;
  font-size: 13px;
  border-radius: 4px;

  &[data-popper-placement^='top'] > #arrow {
    bottom: -4px;
  }

  &[data-popper-placement^='bottom'] > #arrow {
    top: -4px;
  }

  &[data-popper-placement^='left'] > #arrow {
    right: -4px;
  }

  &[data-popper-placement^='right'] > #arrow {
    left: -4px;
  }
`;

const StyledArrow = styled.div`
  visibility: hidden;

  &,
  &:before {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
  }

  &:before {
    visibility: visible;
    content: '';
    transform: rotate(45deg);
  }
`;

export default function Tooltip(props) {
  const tooltipRef = createRef();
  const popcorn = document.querySelectorAll('[data-toggle="tooltip"]')[0];

  useEffect(() => {
    if (popcorn) {
      const tooltip = tooltipRef.current;
      const popperInstance = createPopper(popcorn, tooltip, {
        strategy: 'fixed',
      });

      function show() {
        // Make the tooltip visible
        tooltip.setAttribute('data-show', '');

        // Enable the event listeners
        popperInstance.setOptions((options) => ({
          ...options,
          modifiers: [
            ...options.modifiers,
            { name: 'eventListeners', enabled: true },
          ],
        }));

        // Update its position
        popperInstance.update();
      }

      function hide() {
        // Hide the tooltip
        tooltip.removeAttribute('data-show');

        // Disable the event listeners
        popperInstance.setOptions((options) => ({
          ...options,
          modifiers: [
            ...options.modifiers,
            { name: 'eventListeners', enabled: false },
          ],
        }));
      }

      const showEvents = ['mouseenter', 'focus'];
      const hideEvents = ['mouseleave', 'blur'];

      showEvents.forEach((event) => {
        popcorn.addEventListener(event, show);
      });

      hideEvents.forEach((event) => {
        popcorn.addEventListener(event, hide);
      });
    }
  }, [tooltipRef, popcorn]);

  return (
    <StyledTooltipContainer id="tooltip" ref={tooltipRef}>
      <StyledArrow id="arrow" className="arrow" data-popper-arrow></StyledArrow>
    </StyledTooltipContainer>
  );
}
