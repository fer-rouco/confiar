package com.fnr.confiar.exceptions;

import org.hibernate.exception.ConstraintViolationException;
import org.reflections.Reflections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.Set;

import com.fnr.confiar.config.BaseDTO;
import com.fnr.confiar.config.ErrorResponse;
import com.fnr.confiar.config.Response;
import com.fnr.confiar.generic.services.MessageService;
import com.fnr.confiar.utils.StringUtils;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.UNSUPPORTED_MEDIA_TYPE;


@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @Autowired
    private MessageService messageService;
    
    @ExceptionHandler(AlreadyExistsEntityException.class)
    public final ResponseEntity<ErrorDetails> handleEntityAlreadyExists(AlreadyExistsEntityException ex, WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(LocalDateTime.now(), ex.getMessage(),
                request.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public final ResponseEntity<ErrorDetails> handleEntityNotFound(EntityNotFoundException ex, WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(LocalDateTime.now(), ex.getMessage(),
                request.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BusinessException.class)
    public final ResponseEntity<ErrorDetails> handleBusinessException(EntityNotFoundException ex, WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(LocalDateTime.now(), ex.getMessage(),
                request.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public final ResponseEntity<ErrorDetails> handleIllegalArgumentException(IllegalArgumentException ex, WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(LocalDateTime.now(), ex.getMessage(),
                request.getDescription(false));
        return new ResponseEntity<>(errorDetails, BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleMissingServletRequestParameter(
            MissingServletRequestParameterException ex, HttpHeaders headers,
            HttpStatus status, WebRequest request) {
        String error = ex.getParameterName() + " parameter is missing";
        return buildResponseEntity(new ErrorDetails(LocalDateTime.now(), error, ex.getLocalizedMessage()), BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleHttpMediaTypeNotSupported(
            HttpMediaTypeNotSupportedException ex,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request) {
        StringBuilder builder = new StringBuilder();
        builder.append(ex.getContentType());
        builder.append(" media type is not supported. Supported media types are ");
        ex.getSupportedMediaTypes().forEach(t -> builder.append(t).append(", "));
        return buildResponseEntity(new ErrorDetails(LocalDateTime.now(), builder.substring(0, builder.length() - 2), ex.getLocalizedMessage()), UNSUPPORTED_MEDIA_TYPE);
    }

    @ExceptionHandler({ ResponseException.class, ConstraintViolationException.class, DataIntegrityViolationException.class })
    public ResponseEntity<Response> handleBadRequest(WebRequest request, Exception exception) {
      ErrorResponse responseBody = null;
      Reflections reflections = new Reflections("com.fnr.confiar");
      Set<Class<? extends BaseDTO>> classes = reflections.getSubTypesOf(BaseDTO.class);
  
      Iterator<Class<? extends BaseDTO>> classIterator = classes.iterator();
      while (classIterator.hasNext() && responseBody == null) {
        Class<? extends BaseDTO> clazz = classIterator.next();
        String entityName = clazz.getSimpleName().replaceAll("DTO", "").toUpperCase();
        
        if (exception.getLocalizedMessage().indexOf(entityName) > -1) {
          for (Field f : clazz.getDeclaredFields()) {
            if (exception.getLocalizedMessage().indexOf("(" + StringUtils.camelCaseToUnderscores(f.getName()).toUpperCase()) > -1) {
              responseBody = new ErrorResponse(HttpStatus.CONFLICT, null, messageService.getMessage("field.error." + f.getName()), f.getName());
              break;
            }
          }
        }
      }
  
      if (responseBody == null) {
        responseBody = new ErrorResponse(HttpStatus.CONFLICT, null, messageService.getMessage("general.error"), null);
      }
  
      return ResponseEntity.status(responseBody.getStatus()).body(responseBody);
    }
  
    private ResponseEntity<Object> buildResponseEntity(ErrorDetails error, HttpStatus status) {
        return new ResponseEntity<>(error, status);
    }

}
