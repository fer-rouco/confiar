package com.fnr.confiar.customers;

import java.util.List;

import com.fnr.confiar.base.BaseDTO;
import com.fnr.confiar.generic.dtos.DocumentDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldNameConstants;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@FieldNameConstants
@Builder
public class CustomerDTO extends BaseDTO<Long> {

  private String name;
  private String lastName;
  private String address;
  private String mail;
  private String phone;
  private List<DocumentDTO> identityDocuments;
  private List<DocumentDTO> paychecks;
  
}
