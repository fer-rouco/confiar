import { createRef, useCallback, useEffect, useState } from 'react';
import bootstrap from 'bootstrap/dist/js/bootstrap.js';
import styled from 'styled-components';
import Button from '../controls/buttons/button';

const StyledModalContent = styled.div`
  width: fit-content
`;

export default function Dialog({
  title,
  message,
  show,
  setShow,
  setConfirmation,
  content,
  actions
}) {
  const [titleToShow, setTitleToShow] = useState(null);
  const modalRef = createRef();

  const getModal = useCallback(() => {
    return bootstrap.Modal.getOrCreateInstance(modalRef.current);
  }, [modalRef]);

  const handleClose = () => {
    if (actions) {
      setConfirmation(false);
    }
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
        (actions) ?
          actions.map(action => (
            <Button key={action.id} label={action.label} onClick={() => handleAction(action)} color={action.color} ></Button>
          ))
          : (<></>)
      }
    </div>
  );

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
                {title}
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            {(content) ? (content) : (<div className="modal-body">{message}</div>)}
            {(!actions) ? (<></>) : (getFooter()) }
          </StyledModalContent>
        </div>
      </div>
    </div>
  );
}
