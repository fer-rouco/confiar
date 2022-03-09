package com.fnr.confiar.customers;

import com.fnr.confiar.base.EntityConverter;
import com.fnr.confiar.generic.converters.DocumentConverter;

import org.springframework.stereotype.Component;

@Component
public class CustomerConverter extends EntityConverter<Customer, CustomerDTO> {
  @Override public CustomerDTO convert( Customer source ) {
    DocumentConverter documentConverter = new DocumentConverter();
    CustomerDTO to = CustomerDTO.builder()
      .name(source.getName())
      .lastName(source.getLastName())
      .address(source.getAddress())
      .mail(source.getMail())
      .phone(source.getPhone())
      // .identityDocuments(documentConverter.convert(source.getIdentityDocuments()))
      // .paychecks(documentConverter.convert(source.getPaychecks()))
      .build();
    to.setIdentityDocuments(documentConverter.convert(source.getIdentityDocuments()));
    to.setPaychecks(documentConverter.convert(source.getPaychecks())); 
    to.setId(source.getId());
    return to;
  }
  
  @Override public Customer convert( CustomerDTO source ) {
    DocumentConverter documentConverter = new DocumentConverter();
    Customer to = Customer.builder()
      .name(source.getName())
      .lastName(source.getLastName())
      .address(source.getAddress())
      .mail(source.getMail())
      .phone(source.getPhone())
      // .identityDocuments(documentConverter.convertToEntity(source.getIdentityDocuments()))
      // .paychecks(documentConverter.convertToEntity(source.getPaychecks()))
      .build();
    to.setIdentityDocuments(documentConverter.convertToEntity(source.getIdentityDocuments()));
    to.setPaychecks(documentConverter.convertToEntity(source.getPaychecks()));
    to.setId(source.getId());
    return to;
  }
  
}
