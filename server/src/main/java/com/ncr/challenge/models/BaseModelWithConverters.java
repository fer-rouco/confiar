package com.ncr.challenge.models;


import com.ncr.challenge.entities.BaseEntity;

import org.modelmapper.Converter;

public abstract class BaseModelWithConverters<T extends BaseEntity> extends BaseModel<T> {
  
  protected abstract Converter<?, ?> addConverter();
  protected abstract void createTypeMap();

  public void map(T entity) {
    if (entity != null) {
      BaseModel.modelMapper.addConverter(addConverter());
      BaseModel.modelMapper.map(entity, this);
    }
  }

}
