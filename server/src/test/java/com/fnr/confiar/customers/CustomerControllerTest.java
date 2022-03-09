package com.fnr.confiar.customers;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import com.fnr.confiar.BaseControllerTest;
import com.fnr.confiar.MockDataProvider;
import com.fnr.confiar.base.Response;
import com.fnr.confiar.generic.dtos.FilterDTO;
import com.fnr.confiar.generic.dtos.PaginatorDTO;
import com.fnr.confiar.modules.customers.CustomerDTO;
import com.fnr.confiar.modules.customers.CustomerService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;

public class CustomerControllerTest extends BaseControllerTest {

  @MockBean
  private CustomerService customerService;

  private CustomerDTO customer;

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
    FilterDTO filter = new FilterDTO();
    List<CustomerDTO> customers = MockDataProvider.getCustomers();
    PaginatorDTO paginator = new PaginatorDTO();
    paginator.setRowObjects(customers);
    paginator.setLength(customers.size());
    when(customerService.createPaginator(filter)).thenReturn(paginator);
    
    String responseModelIndexZero = Response.Fields.model.concat("[0]");
    String rowObjectsJsonPath = buildJsonPath(responseModelIndexZero, PaginatorDTO.Fields.rowObjects);

    this.mockMvc.perform(
      post(buildMapping())
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectToContent(filter)))
      .andExpect(status().isOk())
      .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, PaginatorDTO.Fields.length), is(customers.size())))
      .andExpect(jsonPath(buildJsonPath(rowObjectsJsonPath), hasSize(1)))
      .andExpect(jsonPath(buildJsonPath(rowObjectsJsonPath.concat("[0]"), CustomerDTO.Fields.name), is(customers.get(0).getName())))
      .andExpect(jsonPath(buildJsonPath(rowObjectsJsonPath.concat("[0]"), CustomerDTO.Fields.lastName), is(customers.get(0).getLastName())))
      .andExpect(jsonPath(buildJsonPath(rowObjectsJsonPath.concat("[0]"), CustomerDTO.Fields.address), is(customers.get(0).getAddress())))
      .andExpect(jsonPath(buildJsonPath(rowObjectsJsonPath.concat("[0]"), CustomerDTO.Fields.mail), is(customers.get(0).getMail())));
  }


  @Test
  void testUpdate() throws Exception {
    when(customerService.save(customer)).thenReturn(customer);

    String responseModelIndexZero = Response.Fields.model.concat("[0]");
    this.mockMvc.perform(post(buildMapping("update")).contentType(MediaType.APPLICATION_JSON).content(objectToContent(customer)))
    .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, CustomerDTO.Fields.name), is(customer.getName())))
    .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, CustomerDTO.Fields.lastName), is(customer.getLastName())))
    .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, CustomerDTO.Fields.phone), is(customer.getPhone())))
    .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, CustomerDTO.Fields.mail), is(customer.getMail())))
    .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, CustomerDTO.Fields.paychecks), is(customer.getPaychecks())))
    .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, CustomerDTO.Fields.identityDocuments), is(customer.getIdentityDocuments())))
    .andExpect(status().isOk());
  }

  @Test
  void testGetCustomerById() throws Exception {
    when(customerService.findById(customer.getId())).thenReturn(customer);

    String responseModelIndexZero = Response.Fields.model.concat("[0]");
    this.mockMvc.perform(get(buildMapping("{id}"), customer.getId().toString()))
      .andExpect(status().isOk())
      .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, CustomerDTO.Fields.name), is(customer.getName())))
      .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, CustomerDTO.Fields.lastName), is(customer.getLastName())))
      .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, CustomerDTO.Fields.address), is(customer.getAddress())))
      .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, CustomerDTO.Fields.mail), is(customer.getMail())))
      .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, CustomerDTO.Fields.phone), is(customer.getPhone())));
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
