package com.fnr.confiar.customers;

import com.fnr.confiar.config.BaseController;
import com.fnr.confiar.config.Response;
import com.fnr.confiar.generic.dtos.FilterDTO;

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
  public ResponseEntity<Response> findCustomers(@RequestBody FilterDTO filters) {
    return responseOk(customerService.createPaginator(filters));
  }
  
  @PostMapping("/update")
  public ResponseEntity<Response> update(@RequestBody CustomerDTO customerDTO) {
    // return createOrUpdateCustomer(customerDTO);
    return responseOk(customerService.save(customerDTO));
  }

  // private ResponseEntity<Response> createOrUpdateCustomer(CustomerDTO customerDTO) {   
  //   Customer customer = (Customer) customerDTO.toEntity();

  //   customerService.save(customer);
  //   customerDTO.setId(customer.getId());
  //   ResponseEntity<Response> response = responseOk(customerDTO);

  //   return response;
  // }

  @GetMapping(path = "/{id}")
  public ResponseEntity<Response> getCustomerById(@PathVariable("id") Long id) {
    return responseOk(customerService.findById(id));
  }

  @DeleteMapping(path = "/{id}")
  public ResponseEntity<Response> delete(@PathVariable("id") Long id) {
    return (customerService.delete(id)) ? responseOk() : responseConflictError("No se pudo eliminar el usuario.");
  }
  
}
