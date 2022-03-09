package com.fnr.confiar.customers;

import java.util.List;

import com.fnr.confiar.base.BaseEntity;
import com.fnr.confiar.generic.entities.Document;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "customers")
public class Customer extends BaseEntity<Long> {

  @Builder
  public Customer(Long id, String name, String lastName, String address, String mail, String phone) {
    this.setId(id);
    this.name = name;
    this.lastName = lastName;
    this.address = address;
    this.mail = mail;
    this.phone = phone;
  }
  
  @Column(length = 30)
  private String name;
  @Column(length = 30)
  private String lastName;
  @Column(length = 100)
  private String address;
  @Column(nullable = false, unique = true, length = 100)
  private String mail;
  @Column(nullable = false, unique = true, length = 20)
  private String phone;
  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Document> identityDocuments;
  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Document> paychecks;

  // public static List<Customer> reduce(List<CustomerRepository.ReducedCustomer> entities) {
  //   List<Customer> customers = null;
    
  //   ModelMapper modelMapper = new ModelMapper();
  //   try {
  //     customers = entities.stream().map((CustomerRepository.ReducedCustomer entity) -> {
  //       Customer cust = new Customer();
  //       modelMapper.map(entity, cust);
  //       return cust;
  //     }).collect(Collectors.toList());
  //   }
  //   catch(ClassCastException ex) {
  //     ex.printStackTrace();
  //   }
    
  //   return customers;
  // }

}
