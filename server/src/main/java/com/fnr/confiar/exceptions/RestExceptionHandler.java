package com.fnr.confiar.exceptions;

import java.lang.reflect.Field;
import java.util.Iterator;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import com.fnr.confiar.ErrorResponse;
import com.fnr.confiar.Response;
import com.fnr.confiar.entities.BaseEntity;
import com.fnr.confiar.models.BaseModel;
import com.fnr.confiar.services.MessageService;
import com.fnr.confiar.utils.StringUtil;

import org.hibernate.exception.ConstraintViolationException;
import org.reflections.Reflections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

  @Autowired
  private MessageService messageService;
  
  // @ExceptionHandler({ ResponseException.class })
  // protected ResponseEntity<Response> handleNotFound(Exception ex, WebRequest request) {
  //   // return handleExceptionInternal(ex, "Book not found", new HttpHeaders(), HttpStatus.NOT_FOUND, request);
  //   Response response = new Response(HttpStatus.NOT_FOUND);
  //   return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
  // }

  @ExceptionHandler(value = Exception.class)
  public ResponseEntity<Response> defaultErrorHandler(HttpServletRequest request, Exception exception) throws Exception {
    exception.printStackTrace();
    ErrorResponse responseBody = new ErrorResponse(HttpStatus.CONFLICT, new BaseModel<BaseEntity>(null), messageService.getMessage("general.error"), null);
    return ResponseEntity.status(responseBody.getStatus()).body(responseBody);
  }

  @ExceptionHandler({ ResponseException.class, ConstraintViolationException.class, DataIntegrityViolationException.class })
  public ResponseEntity<Response> handleBadRequest(WebRequest request, Exception exception) {
    ErrorResponse responseBody = null;
    Reflections reflections = new Reflections("com.fnr.confiar.models");
    Set<Class<? extends BaseModel>> classes = reflections.getSubTypesOf(BaseModel.class);

    Iterator<Class<? extends BaseModel>> classIterator = classes.iterator();
    while (classIterator.hasNext() && responseBody == null) {
      Class<? extends BaseModel> clazz = classIterator.next();
      String entityName = clazz.getSimpleName().replaceAll("Model", "").toUpperCase();
      
      if (exception.getLocalizedMessage().indexOf(entityName) > -1) {
        for (Field f : clazz.getDeclaredFields()) {
          if (exception.getLocalizedMessage().indexOf("(" + StringUtil.camelCaseToUnderscores(f.getName()).toUpperCase() + ")") > -1) {
            responseBody = new ErrorResponse(HttpStatus.CONFLICT, new BaseModel<BaseEntity>(null), messageService.getMessage("field.error." + f.getName()), f.getName());
            break;
          }
        }
      }
    }

    if (responseBody == null) {
      responseBody = new ErrorResponse(HttpStatus.CONFLICT, new BaseModel<BaseEntity>(null), messageService.getMessage("general.error"), null);
    }

    return ResponseEntity.status(responseBody.getStatus()).body(responseBody);
  }

}