import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin-top: 150px;
`;

const StyledRow = styled.div`
  margin-top: 30px;
`;

const ServerNotReady = () => {
  const getServerNotAvailableTitle = () => {
    return 'The application server is currently not available';
  };

  const getServerNotAvailableDescription = () => {
    return 'Please try again later.';
  };

  const getServerNotAvailableActionText = () => {
    return 'Try again';
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
