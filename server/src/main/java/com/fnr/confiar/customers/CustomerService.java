package com.fnr.confiar.customers;

import java.util.List;

import com.fnr.confiar.config.BaseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService extends BaseService<Customer> {
  @Autowired
  CustomerRepository customerRepository;

  @Autowired
  CustomerConverter customerConverter;

  @Override
  protected Class<Customer> getClazz() {
    return Customer.class;
  }

  @Override
  @SuppressWarnings("unchecked")
  protected CustomerConverter getConverter() {
    return this.customerConverter;
  }
 
  // public PaginatorDTO<?> createPaginator(FilterDTO filters) {
  //   PaginatorDTO<CustomerDTO> paginator = new PaginatorDTO<CustomerDTO>();
  //   paginator.setRowObjects(customerConverter.convert(findByFilters(filters, customerConverter, Customer.class)));
  //   paginator.setLength(countByFilters(filters, Customer.class));
  //   return paginator;
  // }

  public long countCustomers() {
    return customerRepository.count();
  }

  public List<CustomerDTO> findAll() {
    return customerConverter.convert(customerRepository.findAll());
  }

  public CustomerDTO save(CustomerDTO userDTO) {
    return customerConverter.convert(customerRepository.save(customerConverter.convert(userDTO)));
  }

  public CustomerDTO findById(Long id) {
    return customerConverter.convert(customerRepository.findById(id));
  }

  public List<CustomerDTO> findByName(String name) {
    return customerConverter.convert(customerRepository.findByName(name));
  }

  public List<CustomerDTO> findByLastName(String lastName) {
    return customerConverter.convert(customerRepository.findByLastName(lastName));
  }

  public CustomerDTO findByMail(String mail) {
    return customerConverter.convert(customerRepository.findByMail(mail));
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
