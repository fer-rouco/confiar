import { createRef, useCallback, useEffect, useState } from 'react';
import bootstrap from 'bootstrap/dist/js/bootstrap.js';
import styled from 'styled-components';
import Button from '../controls/buttons/button';
import { useDialog } from '../../contexts/dialog-context';


const StyledModalContent = styled.div`
  width: fit-content
`;

export default function Dialog() {
  const dialogContext = useDialog();
  const modalRef = createRef();
  const config = dialogContext.getConfig();

  function getMessage() {
    let message = config.message;
    Object.entries(dialogContext.getModel()).forEach((entry) => {
      let attr = entry[0].toUpperCase();
      let value = entry[1];
      message = message.replaceAll('<%' + attr + '%>', value);
    })
    return message
  }

  const handleClose = () => {
    dialogContext.hideDialog();
  };

  const handleAction = (action) => {
    if (action.action) {
      action.action(dialogContext.getModel()).then(() => {
        dialogContext.setAfterConfirmationFlag(action.key === 'accept');
      });
    }
    dialogContext.hideDialog();
  };

  const getFooter = () => (
    <div className="modal-footer">
      {
        (config.actions) ?
          config.actions.map(action => (
            <Button key={action.key} label={action.label} onClick={() => handleAction(action)} color={action.color} ></Button>
          ))
          : (<></>)
      }
    </div>
  );

  useEffect(() => {
    const modal = bootstrap.Modal.getOrCreateInstance(modalRef.current)

    if (dialogContext.getDialogVisibility()) {
      dialogContext.setAfterConfirmationFlag(false);
      modal.show();
    }
    else {
      modal.hide();
    }

  }, [dialogContext, modalRef]);

  return (
    <div>
      <div
        className="modal fade"
        id="modal"
        ref={modalRef}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <StyledModalContent className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">
                {config.title}
              </h5>
              <Button onClick={handleClose} close ></Button>
            </div>
            {(config.content) ? (config.content) : (<div className="modal-body">{getMessage()}</div>)}
            {(!config.actions) ? (<></>) : (getFooter()) }
          </StyledModalContent>
        </div>
      </div>
    </div>
  );
}
