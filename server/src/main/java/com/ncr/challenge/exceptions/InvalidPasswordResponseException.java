package com.ncr.challenge.exceptions;

import org.springframework.http.HttpStatus;

public class InvalidPasswordResponseException extends ResponseException {

  @Override
  public String getMessage() {
    return "Password invalida.";
  }

  @Override
  public String getField() {
    return "password";
  }

  @Override
  public HttpStatus getStatus() {
    return HttpStatus.FORBIDDEN;
  }

}
