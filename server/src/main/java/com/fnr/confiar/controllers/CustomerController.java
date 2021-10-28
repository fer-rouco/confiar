package com.fnr.confiar.controllers;

import com.fnr.confiar.Response;
import com.fnr.confiar.entities.Customer;
import com.fnr.confiar.models.CustomerModel;
import com.fnr.confiar.models.FilterModel;
import com.fnr.confiar.models.PaginatorModel;
import com.fnr.confiar.services.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/customer")
public class CustomerController extends BaseController {
  @Autowired
  CustomerService customerService;
  
  @PostMapping()
  public ResponseEntity<Response> findCustomers(@RequestBody FilterModel filters) {
    PaginatorModel<CustomerModel> paginator = new PaginatorModel<CustomerModel>();
    paginator.setRowObjects(convertEntityListToModel(customerService.findByFilters(filters, Customer.class), CustomerModel.class));
    paginator.setLength(customerService.countCustomers());
    return responseOk(paginator);
  }
  
  @PostMapping("/update")
  public ResponseEntity<Response> update(@RequestBody CustomerModel customerModel) {
    return createOrUpdateCustomer(customerModel);
  }

  private ResponseEntity<Response> createOrUpdateCustomer(CustomerModel customerModel) {   
    Customer customer = (Customer) customerModel.toEntity();

    customerService.save(customer);
    customerModel.setId(customer.getId());
    ResponseEntity<Response> response = responseOk(customerModel);

    return response;
  }

  @GetMapping(path = "/{id}")
  public ResponseEntity<Response> getCustomerById(@PathVariable("id") Long id) {
    return responseOk(customerService.findById(id), CustomerModel.class);
  }

  @DeleteMapping(path = "/{id}")
  public ResponseEntity<Response> delete(@PathVariable("id") Long id) {
    return (customerService.delete(id)) ? responseOk() : responseConflictError("No se pudo eliminar el usuario.", CustomerModel.class);
  }
  
}
