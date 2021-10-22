package com.fnr.confiar.services;

import java.util.List;
import java.util.Optional;

import com.fnr.confiar.entities.Customer;
import com.fnr.confiar.models.CustomerModel;
import com.fnr.confiar.repositories.CustomerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
  @Autowired
  CustomerRepository customerRepository;

  public long countCustomers() {
    return customerRepository.count();
  }

  public List<Customer> findAll() {
    return (List<Customer>) customerRepository.findAll();
  }
  
  public List<Customer> findCustomers(int pageFrom, int pageSize) {
    return (List<Customer>) Customer.reduce(customerRepository.findAllBy(PageRequest.of(pageFrom, pageSize, Sort.by(Sort.Direction.ASC, CustomerModel.Fields.name))));
  }

  public Customer save(Customer userModel) {
    return customerRepository.save(userModel);
  }

  public Optional<Customer> findById(Long id) {
    return customerRepository.findById(id);
  }

  public List<Customer> findByName(String name) {
    return customerRepository.findByName(name);
  }

  public List<Customer> findByLastName(String lastName) {
    return customerRepository.findByLastName(lastName);
  }

  public Optional<Customer> findByMail(String mail) {
    return customerRepository.findByMail(mail);
  }

  public boolean delete(Long id) {
    try {
      customerRepository.deleteById(id);
      return true;
    }
    catch (Exception exception) {
      return false;
    }
  }
}
