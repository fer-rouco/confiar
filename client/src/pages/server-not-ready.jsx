import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin-top: 150px;
`;

const StyledRow = styled.div`
  margin-top: 30px;
`;

const ServerNotReady = () => {
  const { t } = useTranslation('generic', { keyPrefix: 'serverError' });

  const getServerNotAvailableTitle = () => {
    return t('notAvailable');
  };

  const getServerNotAvailableDescription = () => {
    return t('tryLater');
  };

  const getServerNotAvailableActionText = () => {
    return t('tryAgainAction');
  };

  const onServerNotAvailableAction = () => {
    window.location.reload();
  };

  return (
    <StyledContainer className="container">
      <StyledRow className="row justify-content-center">
        <div className="col" align="center">
          <h2>{getServerNotAvailableTitle()}</h2>
        </div>
      </StyledRow>
      <StyledRow className="row justify-content-center">
        <div className="col" align="center">
          <h3>{getServerNotAvailableDescription()}</h3>
        </div>
      </StyledRow>
      <StyledRow className="row justify-content-center">
        <div className="col" align="center">
          <h3>
            <a href="/#" onClick={onServerNotAvailableAction}>
              {getServerNotAvailableActionText()}
            </a>
          </h3>
        </div>
      </StyledRow>
    </StyledContainer>
  );
};
export default ServerNotReady;
