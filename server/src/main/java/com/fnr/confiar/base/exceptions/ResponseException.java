package com.fnr.confiar.base.exceptions;

import com.fnr.confiar.base.DataTransferObjectInterface;
import com.fnr.confiar.base.ErrorResponse;

import org.springframework.http.HttpStatus;

public abstract class ResponseException extends Exception {
  public abstract String getMessage();
  public abstract String getField();
  public abstract HttpStatus getStatus();

  public ErrorResponse createResponse(DataTransferObjectInterface<?> dto) {
    return new ErrorResponse(this.getStatus(), dto, this.getMessage(), this.getField());
  }

}
