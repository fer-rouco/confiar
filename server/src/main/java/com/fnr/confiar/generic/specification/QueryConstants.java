package com.fnr.confiar.generic.specification;

public interface QueryConstants {
  final String VALUE = "%s";
  final String LIKE = "%%" + VALUE + "%%"; // the first % is to escape the second
}
