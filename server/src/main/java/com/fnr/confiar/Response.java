package com.fnr.confiar;

import java.util.Arrays;
import java.util.Collection;

import com.fnr.confiar.entities.BaseEntity;
import com.fnr.confiar.models.BaseModel;

import org.springframework.http.HttpStatus;

import lombok.experimental.FieldNameConstants;

@FieldNameConstants
public class Response {
  private HttpStatus status;
  private Collection<? extends BaseModel<? extends BaseEntity>> model;
  private boolean collection = false;

  public Response(HttpStatus status) {
    super();
    this.status = status;
  }

  public Response(HttpStatus status, Collection<? extends BaseModel<? extends BaseEntity>> model) {
    super();
    this.setStatus(status);
    this.setModel(model);
  }

  public <M extends BaseModel<? extends BaseEntity>> Response(HttpStatus status, M model) {
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

  public Collection<? extends BaseModel<? extends BaseEntity>> getModel() {
    return model;
  }

  public void setModel(Collection<? extends BaseModel<? extends BaseEntity>> model) {
    this.model = model;
    this.setCollection(true);
  }
  
  public <M extends BaseModel<? extends BaseEntity>> void setModel(M model) {
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
