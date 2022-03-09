package com.fnr.confiar.config;

import java.util.List;
import java.util.Optional;

import com.fnr.confiar.exceptions.ResponseException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class BaseController {

  public ResponseEntity<Response> buildResponse(Response responseBody) {
    return ResponseEntity.status(responseBody.getStatus()).body(responseBody);
  }

  public ResponseEntity<Response> buildResponseFromException(ResponseException responseException, DataTransferObjectInterface<?> dto) {
    return buildResponse(responseException.createResponse(dto));
  }

  public <DTO extends DataTransferObjectInterface<?>> ResponseEntity<Response> responseOk(DTO dto) {
    Response responseBody = new Response(HttpStatus.OK, dto);
    return buildResponse(responseBody);
  }

  public ResponseEntity<Response> responseOk() {
    Response responseBody = new Response(HttpStatus.OK);
    return buildResponse(responseBody);
  }

  public <DTO extends DataTransferObjectInterface<?>> ResponseEntity<Response> responseOk(Optional<DTO> optionalEntity) {
    Response responseBody = new Response(HttpStatus.OK);
    if (!optionalEntity.isEmpty()) {
      responseBody.setModel(optionalEntity.get());
    }
    return buildResponse(responseBody);
  }

  public ResponseEntity<Response> responseList(List<? extends DataTransferObjectInterface<?>> dtoList) {
    Response responseBody = new Response(HttpStatus.OK, dtoList);
    return buildResponse(responseBody);
  }
  
  public <DTO extends DataTransferObjectInterface<?>> ResponseEntity<Response> responseError(DataTransferObjectInterface<?> entity, String message, String field, HttpStatus status) {
    ErrorResponse responseBody = new ErrorResponse(status, entity, message, field);
    return buildResponse(responseBody);
  }

  public <DTO extends DataTransferObjectInterface<?>> ResponseEntity<Response> responseError(DataTransferObjectInterface<?> entity, String message, HttpStatus status) {
    return responseError(entity, message, null, status);
  }

  public <DTO extends DataTransferObjectInterface<?>> ResponseEntity<Response> responseConflictError(DataTransferObjectInterface<?> entity, String message, String field) {
    return responseError(entity, message, field, HttpStatus.CONFLICT);
  }

  public <DTO extends DataTransferObjectInterface<?>> ResponseEntity<Response> responseConflictError(DataTransferObjectInterface<?> entity, String message) {
    return responseError(entity, message, null, HttpStatus.CONFLICT);
  }

  public <DTO extends DataTransferObjectInterface<?>> ResponseEntity<Response> responseConflictError(String message) {
    return responseError(null, message, null, HttpStatus.CONFLICT);
  }

  public <DTO extends DataTransferObjectInterface<?>> ResponseEntity<Response> responseNotFoundError(DataTransferObjectInterface<?> entity, String message, String field) {
    return responseError(entity, message, field, HttpStatus.NOT_FOUND);
  }

  public <DTO extends DataTransferObjectInterface<?>> ResponseEntity<Response> responseForbiddenError(DataTransferObjectInterface<?> entity, String message, String field) {
    return responseError(entity, message, field, HttpStatus.FORBIDDEN);
  }

}

