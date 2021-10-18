import { createRef, useCallback, useEffect, useState } from 'react';
import bootstrap from 'bootstrap/dist/js/bootstrap.js';
import styled from 'styled-components';
import Button from '../controls/buttons/button';

const StyledModalContent = styled.div`
  width: fit-content
`;

export default function Dialog({
  config,
  show,
  setShow
}) {
  const modalRef = createRef();

  const getModal = useCallback(() => {
    return bootstrap.Modal.getOrCreateInstance(modalRef.current);
  }, [modalRef]);

  const handleClose = () => {
    setShow(false);
    getModal().hide();
  };

  const handleAction = (action) => {
    action.action();
    getModal().hide();
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

  if (config) {
    if (config.actions) {
      const actionAccept = config.actions.find((action) => { return action.key === 'accept' || action.key === 'yes'; });
      const actionCancel = config.actions.find((action) => { return action.key === 'cancel' || action.key === 'no'; });
      const actionAcceptFunction = actionAccept.action;
      const actionCancelFunction = actionCancel.action;
      
      actionAccept.action = () => {
        if (actionAcceptFunction) {
          actionAcceptFunction();
        }
        setShow(false);
      };
    
      actionCancel.action = () => {
        if (actionCancelFunction) {
          actionCancelFunction();
        }
        setShow(false);
      };    
    }
  }  

  useEffect(() => {
    if (show) {
      getModal().show();
    }
  }, [show, getModal]);

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
            {(config.content) ? (config.content) : (<div className="modal-body">{config.message}</div>)}
            {(!config.actions) ? (<></>) : (getFooter()) }
          </StyledModalContent>
        </div>
      </div>
    </div>
  );
}
