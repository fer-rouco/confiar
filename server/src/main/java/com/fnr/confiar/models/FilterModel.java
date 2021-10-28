package com.fnr.confiar.models;

import java.util.List;
import java.util.Map;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class FilterModel {
  int pageFrom;
  int pageSize;
  Map<String, String> filters;
  List<String> projectionFields;
}
