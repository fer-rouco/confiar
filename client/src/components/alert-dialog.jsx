import { createRef, useCallback, useEffect, useState } from 'react';
import bootstrap from 'bootstrap/dist/js/bootstrap.js';
import styled from 'styled-components';

const StyledModalContent = styled.div`
  width: fit-content
`;

export default function AlertDialog({
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

  const handleConfirmation = () => {
    if (actions) {
      setConfirmation(true);
    }
    setShow(false);
    getModal().hide();
  };

  const handleClose = () => {
    if (actions) {
      setConfirmation(false);
    }
    setShow(false);
    getModal().hide();
  };

  const getFooter = () => (
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleClose}
      >
        No
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleConfirmation}
      >
        Si
      </button>
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
