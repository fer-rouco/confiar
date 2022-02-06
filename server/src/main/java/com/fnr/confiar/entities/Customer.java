package com.fnr.confiar.entities;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fnr.confiar.repositories.CustomerRepository;

import org.modelmapper.ModelMapper;

import lombok.Data;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
@Entity
@Table(name = "customer")
public class Customer extends BaseEntity {

  @Builder
  public Customer(Long id, String name, String lastName, String address, String mail, String phone) {
    super(id);
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

  public static List<Customer> reduce(List<CustomerRepository.ReducedCustomer> entities) {
    List<Customer> customers = null;
    
    ModelMapper modelMapper = new ModelMapper();
    try {
      customers = entities.stream().map((CustomerRepository.ReducedCustomer entity) -> {
        Customer cust = new Customer();
        modelMapper.map(entity, cust);
        return cust;
      }).collect(Collectors.toList());
    }
    catch(ClassCastException ex) {
      ex.printStackTrace();
    }
    
    return customers;
  }

}
