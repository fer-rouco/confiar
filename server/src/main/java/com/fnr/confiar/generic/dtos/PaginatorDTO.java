package com.fnr.confiar.generic.dtos;

import java.util.List;

import com.fnr.confiar.config.BaseDTO;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldNameConstants;

@Data
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
@FieldNameConstants
public class PaginatorDTO extends BaseDTO<Short> {
  
  List<?> rowObjects;
  long length;

}
