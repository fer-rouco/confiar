package com.fnr.confiar.services;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.fnr.confiar.entities.Customer;
import com.fnr.confiar.models.CustomerModel;
import com.fnr.confiar.repositories.CustomerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService extends BaseService<Customer> {
  @Autowired
  CustomerRepository customerRepository;

  @Autowired
  EntityManager em;

  public long countCustomers() {
    return customerRepository.count();
  }

  public List<Customer> findAll() {
    return (List<Customer>) customerRepository.findAll();
  }
  
  public List<Customer> findCustomersByFilters(int pageFrom, int pageSize, String nameParam, String lastNameParam, String mailParam) {
    String name = String.format(QueryConstants.LIKE, (nameParam != null) ? nameParam.toLowerCase(): "");
    String lastName = String.format(QueryConstants.LIKE, (lastNameParam != null) ? lastNameParam.toLowerCase(): "");
    String mail = String.format(QueryConstants.LIKE, (mailParam != null) ? mailParam.toLowerCase(): "");

    CriteriaBuilder cb = em.getCriteriaBuilder();
    CriteriaQuery<Customer> cq = cb.createQuery(Customer.class);

    Root<Customer> book = cq.from(Customer.class);
    Predicate namePredicate = cb.like(cb.lower(book.get(CustomerModel.Fields.name)), name);
    Predicate lastNamePredicate = cb.like(cb.lower(book.get(CustomerModel.Fields.lastName)), lastName);
    Predicate mailPredicate = cb.like(cb.lower(book.get(CustomerModel.Fields.mail)), mail);
  
    cq.where(namePredicate, lastNamePredicate, mailPredicate);

    TypedQuery<Customer> query = em.createQuery(cq);
    return query.getResultList();


    // return (List<Customer>) Customer.reduce(
    //   customerRepository.findAllByNameOrLastNameOrMailLikeIgnoreCase(
    //     PageRequest.of(pageFrom, pageSize, Sort.by(Sort.Direction.ASC, CustomerModel.Fields.name)),
    //     name,
    //     lastName,
    //     mail
    //   )
    // );
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
