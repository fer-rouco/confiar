package com.fnr.confiar.controllers;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import java.util.Optional;

import com.fnr.confiar.MockDataProvider;
import com.fnr.confiar.Response;
import com.fnr.confiar.entities.Customer;
import com.fnr.confiar.models.CustomerModel;
import com.fnr.confiar.models.FilterModel;
import com.fnr.confiar.models.PaginatorModel;
import com.fnr.confiar.services.CustomerService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;

public class CustomerControllerTest extends BaseControllerTest {

  @MockBean
  private CustomerService customerService;

  private Customer customer;

  @Override
  protected String getBaseMapping() {
    return "/customer";
  }
  
  @BeforeEach
  void init() {
    customer = MockDataProvider.getCustomer();
  }
  
  @Test
  void testFindCustomers() throws Exception {
    FilterModel filter = new FilterModel();
    List<Customer> customers = MockDataProvider.getCustomers();
    when(customerService.findByFilters(filter, Customer.class)).thenReturn(customers);
    when(customerService.countByFilters(filter, Customer.class)).thenReturn(1L);
    
    String responseModelIndexZero = Response.Fields.model.concat("[0]");
    String rowObjectsJsonPath = buildJsonPath(responseModelIndexZero, PaginatorModel.Fields.rowObjects);

      this.mockMvc.perform(
        post(buildMapping())
          .contentType(MediaType.APPLICATION_JSON)
          .content(objectToContent(filter)))
        .andExpect(status().isOk())
        .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, PaginatorModel.Fields.length), is(customers.size())))
        .andExpect(jsonPath(buildJsonPath(rowObjectsJsonPath), hasSize(1)))
        .andExpect(jsonPath(buildJsonPath(rowObjectsJsonPath.concat("[0]"), CustomerModel.Fields.name), is(customers.get(0).getName())))
        .andExpect(jsonPath(buildJsonPath(rowObjectsJsonPath.concat("[0]"), CustomerModel.Fields.lastName), is(customers.get(0).getLastName())))
        .andExpect(jsonPath(buildJsonPath(rowObjectsJsonPath.concat("[0]"), CustomerModel.Fields.address), is(customers.get(0).getAddress())))
        .andExpect(jsonPath(buildJsonPath(rowObjectsJsonPath.concat("[0]"), CustomerModel.Fields.mail), is(customers.get(0).getMail())));
  }


  @Test
  void testUpdate() throws Exception {
    when(customerService.save(customer)).thenReturn(customer);

    String responseModelIndexZero = Response.Fields.model.concat("[0]");
    this.mockMvc.perform(post(buildMapping("update")).contentType(MediaType.APPLICATION_JSON).content(objectToContent(customer)))
    .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, CustomerModel.Fields.name), is(customer.getName())))
    .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, CustomerModel.Fields.lastName), is(customer.getLastName())))
    .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, CustomerModel.Fields.phone), is(customer.getPhone())))
    .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, CustomerModel.Fields.mail), is(customer.getMail())))
    .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, CustomerModel.Fields.paychecks), is(customer.getPaychecks())))
    .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, CustomerModel.Fields.identityDocuments), is(customer.getIdentityDocuments())))
    .andExpect(status().isOk());
  }

  @Test
  void testGetCustomerById() throws Exception {
    when(customerService.findById(customer.getId())).thenReturn(Optional.of(customer));

    String responseModelIndexZero = Response.Fields.model.concat("[0]");
    this.mockMvc.perform(get(buildMapping("{id}"), customer.getId().toString()))
      .andExpect(status().isOk())
      .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, CustomerModel.Fields.name), is(customer.getName())))
      .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, CustomerModel.Fields.lastName), is(customer.getLastName())))
      .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, CustomerModel.Fields.address), is(customer.getAddress())))
      .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, CustomerModel.Fields.mail), is(customer.getMail())))
      .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, CustomerModel.Fields.phone), is(customer.getPhone())));
  }

  @Test
  void testDelete() throws Exception {
    when(customerService.delete(customer.getId())).thenReturn(true);

    this.mockMvc.perform(delete(buildMapping("{id}"), customer.getId().toString()))
      .andExpect(status().isOk());
  }
  
  @Test
  void testDeleteFailed() throws Exception {
    when(customerService.delete(customer.getId())).thenReturn(false);

    this.mockMvc.perform(delete(buildMapping("{id}"), customer.getId().toString()))
      .andExpect(status().isConflict());
  }
  
}
