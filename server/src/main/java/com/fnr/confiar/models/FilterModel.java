package com.fnr.confiar.models;

import java.util.List;
import java.util.Map;

// import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
// TODO: try FilterModel extends Pageable --> pageParameter, sizeParameter...
public class FilterModel { 
  int pageFrom;
  int pageSize;
  Map<String, String> filters;
  List<String> projectionFields;
}
