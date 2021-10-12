package com.fnr.confiar.controllers;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.fnr.confiar.ErrorResponse;
import com.fnr.confiar.Response;
import com.fnr.confiar.entities.BaseEntity;
import com.fnr.confiar.exceptions.ResponseException;
import com.fnr.confiar.models.BaseModel;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class BaseController {

  public ResponseEntity<Response> buildResponse(Response responseBody) {
    return ResponseEntity.status(responseBody.getStatus()).body(responseBody);
  }

  public ResponseEntity<Response> buildResponseFromException(ResponseException responseException, BaseModel<BaseEntity> model) {
    return buildResponse(responseException.createResponse(model));
  }

  public ResponseEntity<Response> buildResponseEntityFromException(ResponseException responseException, BaseEntity entity) {
    return buildResponse(responseException.createResponse(entity));
  }
  
  public <M extends BaseModel<E>, E extends BaseEntity> ResponseEntity<Response> responseOk(M model) {
    Response responseBody = new Response(HttpStatus.OK, model);
    return buildResponse(responseBody);
  }

  public <M extends BaseModel<E>, E extends BaseEntity> ResponseEntity<Response> responseOk(E entity, Class<M> clazz) {
    Response responseBody = new Response(HttpStatus.OK, convertEntityToModel(entity, clazz));
    return buildResponse(responseBody);
  }
    
  public ResponseEntity<Response> responseOk() {
    Response responseBody = new Response(HttpStatus.OK);
    return buildResponse(responseBody);
  }

  public <M extends BaseModel<E>, E extends BaseEntity> ResponseEntity<Response> responseOk(Optional<E> optionalEntity, Class<M> clazz) {
    Response responseBody = new Response(HttpStatus.OK);
    if (!optionalEntity.isEmpty()) {
      responseBody.setModel(convertEntityToModel(optionalEntity.get(), clazz));
    }
    return buildResponse(responseBody);
  }

  public ResponseEntity<Response> responseList(List<? extends BaseModel<? extends BaseEntity>> modelList) {
    Response responseBody = new Response(HttpStatus.OK, modelList);
    return buildResponse(responseBody);
  }
  
  public <M extends BaseModel<E>, E extends BaseEntity> ResponseEntity<Response> responseEntityList(List<E> entityList, Class<M> clazz) {
    List<M> modelList = new ArrayList<>();

    entityList.forEach((E entity) -> {
      modelList.add(convertEntityToModel(entity, clazz));
    });

    return buildResponse(new Response(HttpStatus.OK, modelList));
  }

  private <M extends BaseModel<E>, E extends BaseEntity> M convertEntityToModel(E entity, Class<M> clazz) {
    M genericClassParameter = null;
    try {
      genericClassParameter = clazz.getDeclaredConstructor().newInstance();
    } catch (InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException
        | NoSuchMethodException | SecurityException e) {
      e.printStackTrace();
    }
    genericClassParameter.map(entity);
    return genericClassParameter;
  }

  public <M extends BaseModel<E>, E extends BaseEntity> ResponseEntity<Response> responseError(BaseEntity entity, String message, String field, HttpStatus status, Class<M> clazz) {
    ErrorResponse responseBody = new ErrorResponse(status, new BaseModel<BaseEntity>(entity), message, field);
    return buildResponse(responseBody);
  }

  public <M extends BaseModel<E>, E extends BaseEntity> ResponseEntity<Response> responseError(BaseEntity entity, String message, HttpStatus status, Class<M> clazz) {
    return responseError(entity, message, null, status, clazz);
  }

  public <M extends BaseModel<E>, E extends BaseEntity> ResponseEntity<Response> responseConflictError(BaseEntity entity, String message, String field, Class<M> clazz) {
    return responseError(entity, message, field, HttpStatus.CONFLICT, clazz);
  }

  public <M extends BaseModel<E>, E extends BaseEntity> ResponseEntity<Response> responseConflictError(BaseEntity entity, String message, Class<M> clazz) {
    return responseError(entity, message, null, HttpStatus.CONFLICT, clazz);
  }

  public <M extends BaseModel<E>, E extends BaseEntity> ResponseEntity<Response> responseConflictError(String message, Class<M> clazz) {
    return responseError(null, message, null, HttpStatus.CONFLICT, clazz);
  }

  public <M extends BaseModel<E>, E extends BaseEntity> ResponseEntity<Response> responseNotFoundError(BaseEntity entity, String message, String field, Class<M> clazz) {
    return responseError(entity, message, field, HttpStatus.NOT_FOUND, clazz);
  }

  public <M extends BaseModel<E>, E extends BaseEntity> ResponseEntity<Response> responseForbiddenError(BaseEntity entity, String message, String field, Class<M> clazz) {
    return responseError(entity, message, field, HttpStatus.FORBIDDEN, clazz);
  }

}
