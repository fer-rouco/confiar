package com.fnr.confiar.exceptions;

import java.lang.reflect.Field;
import java.util.Iterator;
import java.util.Set;

import com.fnr.confiar.ErrorResponse;
import com.fnr.confiar.Response;
import com.fnr.confiar.entities.BaseEntity;
import com.fnr.confiar.models.BaseModel;

import org.hibernate.exception.ConstraintViolationException;
import org.reflections.Reflections;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

  // @ExceptionHandler({ ResponseException.class })
  // protected ResponseEntity<Response> handleNotFound(Exception ex, WebRequest request) {
  //   // return handleExceptionInternal(ex, "Book not found", new HttpHeaders(), HttpStatus.NOT_FOUND, request);
  //   Response response = new Response(HttpStatus.NOT_FOUND);
  //   return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
  // }

  @ExceptionHandler({ ResponseException.class, ConstraintViolationException.class, DataIntegrityViolationException.class })
  public ResponseEntity<Response> handleBadRequest(Exception ex, WebRequest request) {
    ErrorResponse responseBody = null;
    Reflections reflections = new Reflections("com.fnr.confiar.models");
    Set<Class<? extends BaseModel>> classes = reflections.getSubTypesOf(BaseModel.class);

    Iterator<Class<? extends BaseModel>> classIterator = classes.iterator();
    while (classIterator.hasNext() && responseBody == null) {
      Class<? extends BaseModel> clazz = classIterator.next();
      String entityName = clazz.getSimpleName().replaceAll("Model", "").toUpperCase();
      
      if (ex.getLocalizedMessage().indexOf(entityName) > -1) {
        for (Field f : clazz.getDeclaredFields()) {
          if (ex.getLocalizedMessage().indexOf("(" + camelCaseToUnderscores(f.getName()).toUpperCase() + ")") > -1) {
            responseBody = new ErrorResponse(HttpStatus.CONFLICT, new BaseModel<BaseEntity>(null), "El " + f.getName() + " ingresado ya existe. Ingrese uno diferente.", f.getName());
            break;
          }
        }
      }
    }

    if (responseBody == null) {
      responseBody = new ErrorResponse(HttpStatus.CONFLICT, new BaseModel<BaseEntity>(null), "Error desconocido.", null);
    }

    return ResponseEntity.status(responseBody.getStatus()).body(responseBody);

  }

  private String camelCaseToUnderscores(String camel) {
    String underscore;
    underscore = String.valueOf(Character.toLowerCase(camel.charAt(0)));
    for (int i = 1; i < camel.length(); i++) {
      underscore += Character.isLowerCase(camel.charAt(i)) ? String.valueOf(camel.charAt(i))
                   : "_" + String.valueOf(Character.toLowerCase(camel.charAt(i)));
    }
    return underscore;
  }
}