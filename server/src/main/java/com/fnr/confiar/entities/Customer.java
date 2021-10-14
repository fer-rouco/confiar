package com.fnr.confiar.entities;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fnr.confiar.repositories.CustomerRepository;

import org.modelmapper.ModelMapper;

import lombok.Data;

@Data
@Entity
@Table(
  name = "customer",
  uniqueConstraints = {
    @UniqueConstraint(name = "customer_unique_mail_idx", columnNames = {"mail"})
  }
)
public class Customer extends BaseEntity {
  
  @Column(length = 30)
  private String name;
  @Column(length = 30)
  private String lastName;
  @Column(length = 100)
  private String address;
  @Column(nullable = false, length = 100)
  private String mail;
  @Column(nullable = false, unique = true, length = 20)
  private String phone;
  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Document> identityDocuments;
  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Document> paychecks;

  public static List<Customer> reduce(List<CustomerRepository.ReducedCustomer> entities) {
    ModelMapper modelMapper = new ModelMapper();
    
    List<Customer> customers = entities.stream().map((CustomerRepository.ReducedCustomer entity) -> {
      Customer cust = new Customer();
      modelMapper.map(entity, cust);
      return cust;
    }).collect(Collectors.toList());
    
    return customers;
  }

}
