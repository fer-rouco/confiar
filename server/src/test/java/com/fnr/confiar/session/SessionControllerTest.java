package com.fnr.confiar.session;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.CoreMatchers.nullValue;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fnr.confiar.BaseControllerTest;
import com.fnr.confiar.MockDataProvider;
import com.fnr.confiar.config.BaseDTO;
import com.fnr.confiar.config.Response;
import com.fnr.confiar.session.SessionInfoDTO.UserInfoData;
import com.fnr.confiar.users.User;
import com.fnr.confiar.users.UserDTO;
import com.fnr.confiar.users.UserService;
import com.fnr.confiar.utils.StringUtils;

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

  private UserDTO user;

  protected String getBaseMapping() {
    return "/session";
  }

  @BeforeEach
  void init() {
    user = MockDataProvider.getUserAdministrator();
  }

  void doLogin() throws Exception {
    when(userService.findByUserName(user.getUserName())).thenReturn(user);

    LinkedMultiValueMap<String, String> requestParams = new LinkedMultiValueMap<>();
    requestParams.add(User.Fields.userName, user.getUserName());
    requestParams.add(User.Fields.password, StringUtils.fromSha256(user.getPassword()));

    String jsonPathSessionInfoUser = buildJsonPath(Response.Fields.model.concat("[0]"), SessionInfoDTO.Fields.user);
    this.mockMvc.perform(get(buildMapping("login")).params(requestParams))
      .andExpect(status().isOk())
      .andExpect(jsonPath(jsonPathSessionInfoUser, is(notNullValue())))
      .andExpect(jsonPath(buildJsonPath(jsonPathSessionInfoUser, UserInfoData.Fields.id), is(user.getUserName())))
      .andExpect(jsonPath(buildJsonPath(jsonPathSessionInfoUser, UserInfoData.Fields.language), is(1)))
      .andExpect(jsonPath(buildJsonPath(jsonPathSessionInfoUser, UserInfoData.Fields.country), is(54)));
  }

  void doLogout() throws Exception {
    String jsonPathSessionInfoUser = buildJsonPath(Response.Fields.model.concat("[0]"), SessionInfoDTO.Fields.user);
    this.mockMvc.perform(get(buildMapping("logout")))
      .andExpect(status().isOk())
      .andExpect(jsonPath(jsonPathSessionInfoUser, is(nullValue())));
  }

  @Test
  void testGetCurrentSessionInfo() throws Exception {
    MvcResult result = this.mockMvc.perform(get(buildMapping()))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$", is(notNullValue())))
      .andExpect(jsonPath(buildJsonPath(Response.Fields.model.concat("[0]"), BaseDTO.Fields.id), is(nullValue())))
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

