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
import com.fnr.confiar.entities.User;
import com.fnr.confiar.entities.UserProfile;
import com.fnr.confiar.models.FilterModel;
import com.fnr.confiar.models.PaginatorModel;
import com.fnr.confiar.models.UserModel;
import com.fnr.confiar.models.UserProfileModel;
import com.fnr.confiar.services.UserService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;

public class UserControllerTest extends BaseControllerTest {
  
  @MockBean
  private UserService userService;
  
  private User user;

  protected String getBaseMapping() {
    return "/user";
  }

  @BeforeEach
  void init() {
    user = MockDataProvider.getUserAdministrator();
  }
  
  @Test
  void testFindUsers() throws Exception {
    FilterModel filter = new FilterModel();
    List<User> users = MockDataProvider.getUsers();
    when(userService.findByFilters(filter, User.class)).thenReturn(users);
    when(userService.countByFilters(filter, User.class)).thenReturn(3L);
    
    String responseModelIndexZero = Response.Fields.model.concat("[0]");
    String rowObjectsJsonPath = buildJsonPath(responseModelIndexZero, PaginatorModel.Fields.rowObjects);
    this.mockMvc.perform(post(buildMapping()).contentType(MediaType.APPLICATION_JSON).content(objectToContent(filter)))
      .andExpect(status().isOk())
      .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, PaginatorModel.Fields.length), is(users.size())))
      .andExpect(jsonPath(buildJsonPath(rowObjectsJsonPath), hasSize(3)))
      .andExpect(jsonPath(buildJsonPath(rowObjectsJsonPath.concat("[0]"), UserModel.Fields.userName), is(users.get(0).getUserName())))
      .andExpect(jsonPath(buildJsonPath(rowObjectsJsonPath.concat("[1]"), UserModel.Fields.userName), is(users.get(1).getUserName())))
      .andExpect(jsonPath(buildJsonPath(rowObjectsJsonPath.concat("[2]"), UserModel.Fields.userName), is(users.get(2).getUserName())));
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
    UserProfileModel userProfileModel = new UserProfileModel("Administrator");
    userProfileModel.setId(1L);
    UserModel userModel = new UserModel("Flor", "Martinez", "florm", "florm@gmail.com", "flor", userProfileModel);
    User userToMock = (User) userModel.toEntity();
    when(userService.saveUser(userToMock)).thenReturn(userToMock);

    String responseModelIndexZero = Response.Fields.model.concat("[0]");
    this.mockMvc.perform(post(buildMapping("update")).contentType(MediaType.APPLICATION_JSON).content(objectToContent(userModel)))
    .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, UserModel.Fields.userName), is(userModel.getUserName())))
    .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, UserModel.Fields.lastName), is(userModel.getLastName())))
    .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, UserModel.Fields.userName), is(userModel.getUserName())))
    .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, UserModel.Fields.mail), is(userModel.getMail())))
    .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, UserModel.Fields.password), is(userModel.getPassword())))
    .andExpect(status().isOk());
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
      .andExpect(jsonPath(buildJsonPath(responseModelIndexZero, UserModel.Fields.password), is(user.getPassword())));
  }

  @Test
  void testGetUsersByProfile() throws Exception {
    UserProfile profile = MockDataProvider.getProfileAdministrator();
    List<User> users = MockDataProvider.getUsers();
    when(userService.findProfileById(1L)).thenReturn(Optional.ofNullable(profile));
    when(userService.findByProfile(profile)).thenReturn(users);

    this.mockMvc.perform(get(buildMapping("byProfile")).param(UserModel.Fields.profile, "1"))
      .andExpect(status().isOk())
      .andExpect(jsonPath(buildJsonPath(Response.Fields.model), hasSize(3)))
      .andExpect(jsonPath(buildJsonPath(Response.Fields.model.concat("[0]"), UserModel.Fields.userName), is(users.get(0).getUserName())))
      .andExpect(jsonPath(buildJsonPath(Response.Fields.model.concat("[1]"), UserModel.Fields.userName), is(users.get(1).getUserName())))
      .andExpect(jsonPath(buildJsonPath(Response.Fields.model.concat("[2]"), UserModel.Fields.userName), is(users.get(2).getUserName())));
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
