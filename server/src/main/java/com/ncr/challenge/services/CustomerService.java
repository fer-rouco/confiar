package com.ncr.challenge.services;

import java.util.List;
import java.util.Optional;

import com.ncr.challenge.entities.Customer;
import com.ncr.challenge.repositories.CustomerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
  @Autowired
  CustomerRepository customerRepository;

  public List<Customer> findAll() {
    return (List<Customer>) customerRepository.findAll();
  }

  public List<Customer> findAllBounded() {
    // return (List<Customer>) Customer.convert(customerRepository.findAllBy(CustomerRepository.BoundedCustomer.class));
    return (List<Customer>) Customer.reduce(customerRepository.findAllBy());
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
