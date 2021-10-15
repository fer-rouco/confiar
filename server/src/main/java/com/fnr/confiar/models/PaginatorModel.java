package com.fnr.confiar.models;

import java.util.List;

import com.fnr.confiar.entities.BaseEntity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
public class PaginatorModel<T extends BaseModel<?>> extends BaseModel<BaseEntity> {
  
  List<T> rowObjects;
  long length;

}
