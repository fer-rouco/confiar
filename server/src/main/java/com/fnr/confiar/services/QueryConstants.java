package com.fnr.confiar.services;

public interface QueryConstants {
  final String VALUE = "%s";
  final String LIKE = "%%" + VALUE + "%%"; // the first % is to escape the second
}
