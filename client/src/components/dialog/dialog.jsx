import { createRef, useCallback, useEffect, useState } from 'react';
import bootstrap from 'bootstrap/dist/js/bootstrap.js';
import styled from 'styled-components';
import i18next from "i18next";
import Button from '../controls/buttons/button';
import { useDialog } from '../../contexts/dialog-context';
import { navigateIntoObjectByPath } from '../../theme';
import { usePage } from '../../contexts/page-context';


const getThemeAttribute = (theme, attrribute) => {
  return navigateIntoObjectByPath(theme, "components.dialog." + attrribute);
}

const StyledModalContent = styled.div`
  &.modal-content {
    width: fit-content;
    
    .modal-header .modal-title {
      color: ${({ theme }) => getThemeAttribute(theme, "header.color")};
    }
    .modal-header {
      background-color: ${({ theme }) => getThemeAttribute(theme, "header.bgColor")};
      color: ${({ theme }) => getThemeAttribute(theme, "header.color")};
    }
    .modal-body {
      background-color: ${({ theme }) => getThemeAttribute(theme, "body.bgColor")};
      color: ${({ theme }) => getThemeAttribute(theme, "body.color")};
    }
    .modal-footer {
      background-color: ${({ theme }) => getThemeAttribute(theme, "footer.bgColor")};
      color: ${({ theme }) => getThemeAttribute(theme, "footer.color")};
    }
  }
`;

export default function Dialog() {
  const dialogContext = useDialog();
  const config = dialogContext.getDefinition();
  const modalRef = createRef();
  const componentTranslation = i18next.getFixedT(null, 'components', 'dialog');
  const { resolveTranslation } = usePage();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");


  const handleClose = () => {
    dialogContext.hideDialog();
  };

  const handleAction = (actionConfig) => {
    if (actionConfig.action) {
      actionConfig.action(dialogContext.getModel()).then(() => {
        dialogContext.setAfterConfirmationError(null);
        dialogContext.setAfterConfirmation(actionConfig.key === 'accept');
      }).catch((error) => {
        dialogContext.setAfterConfirmationError(error);
      });
    }
    dialogContext.hideDialog();
  };

  const getFooter = () => (
    <div className="modal-footer">
      {
        (config.actions) ?
          config.actions.map(actionConfig => (
            <Button key={actionConfig.key} label={componentTranslation("actions.".concat(actionConfig.key))} onClick={() => handleAction(actionConfig)} color={actionConfig.color} ></Button>
          ))
          : (<></>)
      }
    </div>
  );

  useEffect(() => {
    const modal = bootstrap.Modal.getOrCreateInstance(modalRef.current)

    if (dialogContext.getDialogVisibility()) {
      dialogContext.setTranslationActionKey(config.key);
      const prefix = dialogContext.getTranslationPrefixKey() + '.' + config.key + '.dialog.';
      const titleToResolve = (config.title) ? config.title : { key: "title" };
      const messageToResolve = (config.message) ? config.message : { key: "message" };
      setTitle(resolveTranslation(titleToResolve, prefix, dialogContext.getModel()));
      setMessage(resolveTranslation(messageToResolve, prefix, dialogContext.getModel()));
      dialogContext.setAfterConfirmation(false);
      dialogContext.setAfterConfirmationError(null);
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
                {title}
              </h5>
              <Button onClick={handleClose} close ></Button>
            </div>
            {(config.content) ? (config.content) : (<div className="modal-body">{message}</div>)}
            {(!config.actions) ? (<></>) : (getFooter()) }
          </StyledModalContent>
        </div>
      </div>
    </div>
  );
}
