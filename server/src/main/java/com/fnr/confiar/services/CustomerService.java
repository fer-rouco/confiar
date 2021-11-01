package com.fnr.confiar.services;

import java.util.List;
import java.util.Optional;

import com.fnr.confiar.entities.Customer;
import com.fnr.confiar.models.BaseModel;
import com.fnr.confiar.models.FilterModel;
import com.fnr.confiar.repositories.CustomerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class CustomerService extends BaseService<Customer> {
  @Autowired
  CustomerRepository customerRepository;

  public List<Customer> findCustomers(FilterModel filter) {
    Specification<Customer> spec = findByFiltersSpecification(filter);
    Page<Customer> page = null;
    try {
      if (spec != null) {
        page = customerRepository.findAll(spec, PageRequest.of(filter.getPageFrom(), filter.getPageSize(), Sort.by(Sort.Direction.ASC, BaseModel.Fields.id)));
      }
      else {
        page = customerRepository.findAll(PageRequest.of(filter.getPageFrom(), filter.getPageSize(), Sort.by(Sort.Direction.ASC, BaseModel.Fields.id)));
      }
    }
    catch(Exception e) {
      e.printStackTrace();
    }

    return page.getContent();
  }
  

  public long countCustomers() {
    return customerRepository.count();
  }

  public List<Customer> findAll() {
    return (List<Customer>) customerRepository.findAll();
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
