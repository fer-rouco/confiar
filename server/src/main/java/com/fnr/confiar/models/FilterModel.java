package com.fnr.confiar.models;

import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Sort;

// import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
// TODO: try FilterModel extends Pageable --> pageParameter, sizeParameter...
public class FilterModel { 
  int pageFrom = 0;
  int pageSize = 10;
  Sort.Direction sortDirection = Sort.Direction.ASC;
  String sortField = BaseModel.Fields.id;
  Map<String, String> filters;
  List<String> projectionFields;
}
