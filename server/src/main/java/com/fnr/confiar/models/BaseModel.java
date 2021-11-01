package com.fnr.confiar.models;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.ParameterizedType;

import com.fnr.confiar.entities.BaseEntity;

import org.modelmapper.ModelMapper;


import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldNameConstants;

@Data
@EqualsAndHashCode
@NoArgsConstructor
@FieldNameConstants
public class BaseModel<T extends BaseEntity> {
  protected static ModelMapper modelMapper = new ModelMapper();

  private Long id;

  public BaseModel(T entity) {
    map(entity);
  }

  // protected abstract Converter<?, ?> addConverter();
  // protected abstract void createTypeMap();

  public void map(T entity) {
    if (entity != null) {
      BaseModel.modelMapper.map(entity, this);
    }
  }

  @SuppressWarnings("unchecked")
  public BaseEntity toEntity() {
    ParameterizedType superClass = (ParameterizedType) getClass().getGenericSuperclass();   
    Class<T> type = (Class<T>) superClass.getActualTypeArguments()[0];
    T genericClassParameter = null;
    
    try {
      type.getDeclaredConstructor();
      genericClassParameter = type.getDeclaredConstructor().newInstance();
    } catch (InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException
        | NoSuchMethodException | SecurityException e) {
      e.printStackTrace();
    }
    
    return BaseModel.modelMapper.map(this, genericClassParameter.getClass());
  }
  
}
