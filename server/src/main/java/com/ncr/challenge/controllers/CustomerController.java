package com.ncr.challenge.controllers;

import com.ncr.challenge.Response;
import com.ncr.challenge.entities.Customer;
import com.ncr.challenge.models.CustomerModel;
import com.ncr.challenge.services.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/customer")
public class CustomerController extends BaseController {
  @Autowired
  CustomerService customerService;

  @GetMapping()
  public ResponseEntity<Response> getCustomers() {
    return responseEntityList(customerService.findAllBounded(), CustomerModel.class);
  }

  @PostMapping("/create")
  public ResponseEntity<Response> create(@RequestBody CustomerModel customerModel) {
    return createOrUpdateCustomer(true, customerModel);
  }
  
  @PutMapping("/update")
  public ResponseEntity<Response> update(@RequestBody CustomerModel customerModel) {
    return createOrUpdateCustomer(false, customerModel);
  }

  private ResponseEntity<Response> createOrUpdateCustomer(Boolean create, CustomerModel customerModel) {
    Customer customer = null;
    // if (create) {
    //   customer = (Customer) customerModel.toEntity();
    // }
    // else {
    //   customer = customerService.findById(customerModel.getId()).get();
    // }
    
    customer = (Customer) customerModel.toEntity();

    ResponseEntity<Response> response = null;
    try {
      customerService.save(customer);
      customerModel.setId(customer.getId());
      response = responseOk(customerModel);
    }
    catch(DataIntegrityViolationException ex) {
      if (ex.getCause().getCause().getMessage().indexOf("CUSTOMER_UNIQUE_MAIL_IDX") > -1) {
        response = responseConflictError(null, "El mail ingresado ya existe. Ingrese uno diferente.", "mail", CustomerModel.class);
      }
    }

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
