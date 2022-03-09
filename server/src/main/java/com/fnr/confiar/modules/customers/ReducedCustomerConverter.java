package com.fnr.confiar.modules.customers;

import com.fnr.confiar.base.EntityConverter;

import org.springframework.stereotype.Component;

@Component
public class ReducedCustomerConverter extends EntityConverter<Customer, CustomerRepository.ReducedCustomer> {
  @Override public CustomerRepository.ReducedCustomer convert( Customer source ) {
    return new CustomerRepository.ReducedCustomer() {
      @Override
      public Long getId() {
        return source.getId();
      }

      @Override
      public String getName() {
        return source.getName();
      }

      @Override
      public String getLastName() {
        return source.getLastName();
      }

      @Override
      public String getMail() {
        return source.getMail();
      }      
    };
  }
  
  @Override public Customer convert( CustomerRepository.ReducedCustomer source ) {
    Customer to = Customer.builder()
      .id(source.getId())
      .name(source.getName())
      .lastName(source.getLastName())
      .mail(source.getMail())
      .build();
    return to;
  }
}