package com.fnr.confiar.modules.customers;

import java.util.List;
import java.util.Optional;

import com.fnr.confiar.base.DataTransferObjectInterface;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends CrudRepository<Customer, Long>, JpaSpecificationExecutor<Customer> {
  // public abstract <T> List<T> findAllBy(Class<T> type);
  public abstract Page<Customer> findAll(Pageable pageable);
  public abstract List<Customer> findByName(String name);
  public abstract List<Customer> findByLastName(String lastName);
  public abstract Optional<Customer> findByMail(String mail);

  interface ReducedCustomer extends DataTransferObjectInterface<Long> {
    String getName();
    String getLastName();
    String getMail();
  }
  
}
