package com.ncr.challenge.exceptions;

import com.ncr.challenge.ErrorResponse;
import com.ncr.challenge.entities.BaseEntity;
import com.ncr.challenge.models.BaseModel;

import org.springframework.http.HttpStatus;

public abstract class ResponseException extends Exception {
  public abstract String getMessage();
  public abstract String getField();
  public abstract HttpStatus getStatus();

  public ErrorResponse createResponse(BaseEntity entity) {
    BaseModel<BaseEntity> model = (entity == null) ? null : new BaseModel<BaseEntity>(entity);
    return new ErrorResponse(this.getStatus(), model, this.getMessage(), this.getField());
  }

  public ErrorResponse createResponse(BaseModel<BaseEntity> model) {
    return new ErrorResponse(this.getStatus(), model, this.getMessage(), this.getField());
  }
}
