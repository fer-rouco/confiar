package com.fnr.confiar.models;

import com.fnr.confiar.entities.Store;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class StoreModel extends BaseModel<Store> {

  private Short number;
  private String name;
  
  public StoreModel(Store entity) {
    super(entity);
  }

}
