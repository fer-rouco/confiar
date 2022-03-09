package com.fnr.confiar.base;

import java.util.Arrays;
import java.util.Collection;

import org.springframework.http.HttpStatus;

import lombok.experimental.FieldNameConstants;

@FieldNameConstants
public class Response {
  private HttpStatus status;
  private Collection<? extends DataTransferObjectInterface<?>> model;
  private boolean collection = false;

  public Response(HttpStatus status) {
    super();
    this.status = status;
  }

  public Response(HttpStatus status, Collection<? extends DataTransferObjectInterface<?>> model) {
    super();
    this.setStatus(status);
    this.setModel(model);
  }

  public <M extends DataTransferObjectInterface<?>> Response(HttpStatus status, M model) {
    super();
    this.setStatus(status);
    this.setModel(model);
  }
  
  public HttpStatus getStatus() {
    return status;
  }

  public void setStatus(HttpStatus status) {
    this.status = status;
  }

  public Collection<? extends DataTransferObjectInterface<?>> getModel() {
    return model;
  }

  public void setModel(Collection<? extends DataTransferObjectInterface<?>> model) {
    this.model = model;
    this.setCollection(true);
  }
  
  public <M extends DataTransferObjectInterface<?>> void setModel(M model) {
    this.model = Arrays.asList(model);
    this.setCollection(false);
  }

  public boolean isCollection() {
    return collection;
  }

  public void setCollection(boolean collection) {
    this.collection = collection;
  }


}
