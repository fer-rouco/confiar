package com.fnr.confiar.config;

import lombok.Data;

public interface DataTransferObjectInterface<ID extends Number> {
  ID getId();
  // void setId(Long id);
  // void setId(Short id);
}
