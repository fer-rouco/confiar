package com.fnr.confiar.base.exceptions;

import org.springframework.http.HttpStatus;

public class UserNotFoundResponseException extends ResponseException {

  @Override
  public String getMessage() {
    return "Usuario no encontrado.";
  }

  @Override
  public String getField() {
    return "user";
  }

  @Override
  public HttpStatus getStatus() {
    return HttpStatus.NOT_FOUND;
  }
  
}
