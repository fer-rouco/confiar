package com.fnr.confiar.users;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Base64;
import java.util.List;

import com.fnr.confiar.BaseControllerTest;
import com.fnr.confiar.MockDataProvider;
import com.fnr.confiar.config.Response;
import com.fnr.confiar.generic.dtos.FilterDTO;
import com.fnr.confiar.generic.dtos.PaginatorDTO;
import com.fnr.confiar.utils.StringUtil;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;

public class UserControllerTest extends BaseControllerTest {
  
  @MockBean
  private UserService userService;
  
  private UserDTO user;

  protected String getBaseMapping() {
    return "/user";
  }

  @BeforeEach
  void init() {
    user = MockDataProvider.getUserAdministrator();
  }
  
  @Test
  void testFindUsers() throws Exception {
    FilterDTO filter = new FilterDTO();
    List<UserDTO> users = MockDataProvider.getUsers();
    PaginatorDTO paginator = new PaginatorDTO();
    paginator.setRowObjects(users);
    paginator.setLength(users.size());
    when(userService.createPaginator(filter)).thenReturn(paginator);
    
    String responseModelIndexZero = Response.Fields.model.concat("[0]");
    String rowObjectsJsonPath = buildJsonPath(responseModelIndexZero, PaginatorDTO.Fields.rowObjects);
    this.mockMvc.perform(post(buildMapping()).contentType(MediaType.APPLICATION_JSON).content(objectToContent(filter)))
      .andExpect(status().isOk())
      .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, PaginatorDTO.Fields.length), is(users.size())))
      .andExpect(jsonPath(buildJsonPath(rowObjectsJsonPath), hasSize(3)))
      .andExpect(jsonPath(buildJsonPath(rowObjectsJsonPath.concat("[0]"), UserDTO.Fields.userName), is(users.get(0).getUserName())))
      .andExpect(jsonPath(buildJsonPath(rowObjectsJsonPath.concat("[1]"), UserDTO.Fields.userName), is(users.get(1).getUserName())))
      .andExpect(jsonPath(buildJsonPath(rowObjectsJsonPath.concat("[2]"), UserDTO.Fields.userName), is(users.get(2).getUserName())));
  }

  @Test
  void testGetProfiles() throws Exception {
    when(userService.getProfiles()).thenReturn(MockDataProvider.getProfiles());

    this.mockMvc.perform(get(buildMapping("profiles")))
      .andExpect(status().isOk())
      .andExpect(jsonPath(Response.Fields.model, hasSize(3)));
  }

  @Test
  void testUpdate() throws Exception {
    UserProfileDTO userProfileModel = new UserProfileDTO("Administrator");
    userProfileModel.setId(Short.parseShort("1"));
    UserDTO user = new UserDTO("Flor", "Martinez", "florm", "florm@gmail.com", StringUtil.toSha256("flor"), userProfileModel);
    when(userService.saveUser(user)).thenReturn(user);

    String responseModelIndexZero = Response.Fields.model.concat("[0]");
    this.mockMvc.perform(post(buildMapping("update")).contentType(MediaType.APPLICATION_JSON).content(objectToContent(user)))
    .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, UserDTO.Fields.userName), is(user.getUserName())))
    .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, UserDTO.Fields.lastName), is(user.getLastName())))
    .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, UserDTO.Fields.userName), is(user.getUserName())))
    .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, UserDTO.Fields.mail), is(user.getMail())))
    .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, UserDTO.Fields.password), is(Base64.getEncoder().encodeToString(user.getPassword()))))
    .andExpect(status().isOk());
  }

  @Test
  void testGetUserById() throws Exception {
    when(userService.findById(user.getId())).thenReturn(user);

    String responseModelIndexZero = Response.Fields.model.concat("[0]");
    this.mockMvc.perform(get(buildMapping("{id}"), user.getId().toString()))
      .andExpect(status().isOk())
      .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, UserDTO.Fields.name), is(user.getName())))
      .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, UserDTO.Fields.lastName), is(user.getLastName())))
      .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, UserDTO.Fields.userName), is(user.getUserName())))
      .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, UserDTO.Fields.mail), is(user.getMail())))
      .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, UserDTO.Fields.password), is(Base64.getEncoder().encodeToString(user.getPassword()))));
  }

  @Test
  void testGetUsersByProfile() throws Exception {
    UserProfileDTO profile = MockDataProvider.getProfileAdministrator();
    List<UserDTO> users = MockDataProvider.getUsers();
    when(userService.findProfileById(1L)).thenReturn(profile);
    when(userService.findByProfile(profile)).thenReturn(users);

    this.mockMvc.perform(get(buildMapping("byProfile")).param(UserDTO.Fields.profile, "1"))
      .andExpect(status().isOk())
      .andExpect(jsonPath(buildJsonPath(Response.Fields.model), hasSize(3)))
      .andExpect(jsonPath(buildJsonPath(Response.Fields.model.concat("[0]"), UserDTO.Fields.userName), is(users.get(0).getUserName())))
      .andExpect(jsonPath(buildJsonPath(Response.Fields.model.concat("[1]"), UserDTO.Fields.userName), is(users.get(1).getUserName())))
      .andExpect(jsonPath(buildJsonPath(Response.Fields.model.concat("[2]"), UserDTO.Fields.userName), is(users.get(2).getUserName())));
  }

  @Test
  void testDelete() throws Exception {
    when(userService.deleteUser(user.getId())).thenReturn(true);

    this.mockMvc.perform(delete(buildMapping("{id}"), user.getId().toString()))
      .andExpect(status().isOk());
  }
  
  @Test
  void testDeleteFailed() throws Exception {
    when(userService.deleteUser(user.getId())).thenReturn(false);

    this.mockMvc.perform(delete(buildMapping("{id}"), user.getId().toString()))
      .andExpect(status().isConflict());
  }
}
