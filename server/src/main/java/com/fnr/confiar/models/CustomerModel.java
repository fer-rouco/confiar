package com.fnr.confiar.models;

import java.util.List;

import com.fnr.confiar.entities.Customer;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldNameConstants;

@Data
@NoArgsConstructor
@FieldNameConstants
public class CustomerModel extends BaseModel<Customer> {

  private String name;
  private String lastName;
  private String address;
  private String mail;
  private String phone;
  private List<DocumentModel> identityDocuments;
  private List<DocumentModel> paychecks;

  public CustomerModel(Customer entity) {
    super(entity);
  }
  
}
