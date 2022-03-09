package com.fnr.confiar.base;

import org.springframework.http.HttpStatus;

public class ErrorResponse extends Response {

  private String message;
  private String field;

  
  public ErrorResponse(HttpStatus status, DataTransferObjectInterface<?> model, String message) {
    this(status, model, message, null);
  }

  public ErrorResponse(HttpStatus status, DataTransferObjectInterface<?> model, String message, String field) {
      super(status, model);
      this.message = message;
      this.field = field;
  }
  
  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public String getField() {
    return field;
  }

  public void setField(String field) {
    this.field = field;
  }

}