import React from 'react';
import { useAlertMessage } from '../../contexts/alert-message-context';
import styled from 'styled-components';
import Icon from './icon';
import Button from '../controls/buttons/button';

const StyledAlertMessage = styled.div`
  // floating
  position: absolute;
  float: right;
  top: 20px;
  right: 20px;
  z-index: 9999;

  // btn-floating
  float: right;
  right: 20px;

  // alert-server
  margin-bottom: 0;
  border-radius: 10px;
`;

const StyledAlertMessageText = styled.div`
  bottom: 5px;
  display: inline;
  position: relative;
`;

const StyledAlertMessageIcon = styled(Icon)`
  display: inline-block;
  top: 4px;
  position: relative;
`;

const StyledAlertMessageCloseButton = styled(Button)`
  bottom: 6px;
  position: relative;
  margin-left: 10px;
`;

export default function AlertMessage() {
  const { messageObject, cleanMessage } = useAlertMessage();

  const cleanMessageIfExistsInDOM = () => {
    let alert = document.getElementsByClassName('alert')[0];
    if (alert) {
      cleanMessage();
    }
  };

  const onCloseAlertMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    cleanMessageIfExistsInDOM();
  };

  setTimeout(function () {
    cleanMessageIfExistsInDOM();
  }, 5000);

  const alertMessage = (
    <StyledAlertMessage
      className={'alert floating alert-server alert-' + messageObject.severity}
      onClose={onCloseAlertMessage}
      role="alert"
    >
      <StyledAlertMessageIcon
        fontName={messageObject.icon}
      ></StyledAlertMessageIcon>
      <StyledAlertMessageText>{messageObject.message}</StyledAlertMessageText>
      <StyledAlertMessageCloseButton
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onCloseAlertMessage}
        close
      ></StyledAlertMessageCloseButton>
    </StyledAlertMessage>
  );

  return (
    <div>
      {messageObject.message && messageObject.message.length > 0 ? (
        alertMessage
      ) : (
        <></>
      )}
    </div>
  );
}
