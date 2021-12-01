package com.fnr.confiar.controllers;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Optional;

import com.fnr.confiar.MockDataProvider;
import com.fnr.confiar.Response;
import com.fnr.confiar.entities.User;
import com.fnr.confiar.models.UserModel;
import com.fnr.confiar.services.UserService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;

public class UserControllerTest extends BaseControllerTest {
  
  @MockBean
  private UserService userService;
  
  private User user;

  protected String getBaseMapping() {
    return "/user";
  }

  @BeforeEach
  void init() {
    user = MockDataProvider.getUserData();
  }
  
  @Test
  void testFindUsers() throws Exception {

  }

  @Test
  void testGetProfiles() throws Exception {
    when(userService.getProfiles()).thenReturn(MockDataProvider.getProfiles());

    this.mockMvc.perform(get(buildMapping("profiles")))
      .andExpect(status().isOk())
      .andExpect(jsonPath(Response.Fields.model, hasSize(3)))
      .andReturn();
  }

  @Test
  void testGetUserById() throws Exception {
    when(userService.findById(user.getId())).thenReturn(Optional.of(user));

    String responseModelIndexZero = Response.Fields.model.concat("[0]");
    this.mockMvc.perform(get(buildMapping("{id}"), user.getId().toString()))
      .andExpect(status().isOk())
      .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, UserModel.Fields.name), is(user.getName())))
      .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, UserModel.Fields.lastName), is(user.getLastName())))
      .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, UserModel.Fields.userName), is(user.getUserName())))
      .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, UserModel.Fields.mail), is(user.getMail())))
      .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, UserModel.Fields.password), is(user.getPassword())))
      .andReturn();
  }

  @Test
  void testGetUsersByProfile() throws Exception {

  }

  @Test
  void testUpdate() throws Exception {

  }
      
  @Test
  void testDelete() throws Exception {

  }
}
