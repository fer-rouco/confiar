package com.fnr.confiar.controllers;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.CoreMatchers.nullValue;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Optional;

import com.fnr.confiar.MockDataProvider;
import com.fnr.confiar.Response;
import com.fnr.confiar.entities.User;
import com.fnr.confiar.models.BaseModel;
import com.fnr.confiar.models.SessionInfoModel;
import com.fnr.confiar.models.SessionInfoModel.UserInfoData;
import com.fnr.confiar.services.UserService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.util.LinkedMultiValueMap;

@SpringBootTest
public class SessionControllerTest extends BaseControllerTest {

  @MockBean
  private UserService userService;

  private User user;

  protected String getBaseMapping() {
    return "/session";
  }

  @BeforeEach
  void init() {
    user = MockDataProvider.getUserAdministrator();
  }

  void doLogin() throws Exception {
    when(userService.findByUserName(user.getUserName())).thenReturn(Optional.ofNullable(user));

    LinkedMultiValueMap<String, String> requestParams = new LinkedMultiValueMap<>();
    requestParams.add(User.Fields.userName, user.getUserName());
    requestParams.add(User.Fields.password, user.getPassword());

    String jsonPathSessionInfoUser = buildJsonPath(Response.Fields.model.concat("[0]"), SessionInfoModel.Fields.user);
    this.mockMvc.perform(get(buildMapping("login")).params(requestParams))
      .andExpect(status().isOk())
      .andExpect(jsonPath(jsonPathSessionInfoUser, is(notNullValue())))
      .andExpect(jsonPath(buildJsonPath(jsonPathSessionInfoUser, UserInfoData.Fields.id), is(user.getUserName())))
      .andExpect(jsonPath(buildJsonPath(jsonPathSessionInfoUser, UserInfoData.Fields.language), is(1)))
      .andExpect(jsonPath(buildJsonPath(jsonPathSessionInfoUser, UserInfoData.Fields.country), is(54)));
  }

  void doLogout() throws Exception {
    String jsonPathSessionInfoUser = buildJsonPath(Response.Fields.model.concat("[0]"), SessionInfoModel.Fields.user);
    this.mockMvc.perform(get(buildMapping("logout")))
      .andExpect(status().isOk())
      .andExpect(jsonPath(jsonPathSessionInfoUser, is(nullValue())));
  }

  @Test
  void testGetCurrentSessionInfo() throws Exception {
    MvcResult result = this.mockMvc.perform(get(buildMapping()))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$", is(notNullValue())))
      .andExpect(jsonPath(buildJsonPath(Response.Fields.model.concat("[0]"), BaseModel.Fields.id), is(nullValue())))
      .andReturn();

      String resultInfo = result.getResponse().getContentAsString();
      assertTrue(resultInfo.indexOf(Response.Fields.model) > -1);
  }

  @Test
  void testLogin() throws Exception {
    doLogin();
  }

  @Test
  void testLogout() throws Exception {
    doLogin();
    doLogout();
  }
}

