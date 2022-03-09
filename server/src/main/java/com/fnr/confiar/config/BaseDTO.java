package com.fnr.confiar.config;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldNameConstants;

@Data
@EqualsAndHashCode
@NoArgsConstructor
@FieldNameConstants
public class BaseDTO<ID extends Number> implements DataTransferObjectInterface<ID> {

  private ID id;
  
}
