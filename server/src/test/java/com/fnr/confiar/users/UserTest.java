package com.fnr.confiar.users;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;

import java.util.Collection;
import java.util.List;

import com.fnr.confiar.MockDataProvider;
import com.fnr.confiar.utils.StringUtils;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.mock.mockito.MockBean;


@DataJpaTest
public class UserTest {
  @MockBean
  private UserService userService;
  
  private UserDTO user;

  @BeforeEach
  void init() {
    user = MockDataProvider.getUserAdministrator();
  }
  

  @Test
  void testCreate() {
    when(userService.saveUser(user)).thenReturn(null);
    when(userService.findByUserName(user.getUserName())).thenReturn(user);
    userService.saveUser(user);
    UserDTO userInDb = userService.findByUserName(user.getUserName());
    assert (user == userInDb);
  }

  @Test
  void testDelete() {
    when(userService.countUsers()).thenReturn(15L);
    assert (15 == userService.countUsers());
    userService.deleteUser(1L);
    when(userService.countUsers()).thenReturn(14L);
    assert (14 == userService.countUsers());
    when(userService.findById(1L)).thenReturn(null);
    UserDTO deletedUser = userService.findById(1L);
    assertNull(deletedUser);
  }

  @Test
  void testGetUserById() {
    when(userService.findById(1L)).thenReturn(user);
    UserDTO userInDb = userService.findById(1L);
    assert (userInDb != null);
    assert (userInDb.getId() == 1L);
  }

  @Test
  void testGetUsers() throws Exception {
    List<UserDTO> usersMock = MockDataProvider.getUsers();
    usersMock.addAll(MockDataProvider.getUsers());
    usersMock.addAll(MockDataProvider.getUsers());
    usersMock.addAll(MockDataProvider.getUsers());
    usersMock.addAll(MockDataProvider.getUsers());
    when(userService.findAll()).thenReturn(usersMock);
    Iterable<UserDTO> users = userService.findAll();
    assert (15 == ((Collection<UserDTO>) users).size());
  }

  @Test
  void testGetUsersByProfile() {
    UserProfileDTO administratorMock = MockDataProvider.getProfileAdministrator();
    UserProfileDTO sellerMock = MockDataProvider.getProfileSeller();

    List<UserDTO> cashiersMock = MockDataProvider.getUsers();
    cashiersMock.addAll(MockDataProvider.getUsers());
    cashiersMock.addAll(MockDataProvider.getUsers());

    List<UserDTO> supervisorsMock = MockDataProvider.getUsers();
    supervisorsMock.addAll(MockDataProvider.getUsers());

    when(userService.findProfileById(1L)).thenReturn(administratorMock);
    when(userService.findProfileById(2L)).thenReturn(sellerMock);
    when(userService.findByProfile(administratorMock)).thenReturn(cashiersMock);
    when(userService.findByProfile(sellerMock)).thenReturn(supervisorsMock);

    List<UserDTO> cashiers = userService.findByProfile(userService.findProfileById(1L));
    List<UserDTO> supervisors = userService.findByProfile(userService.findProfileById(2L));
    assert (cashiers.size() == 9);
    assert (supervisors.size() == 6);
  }

  @Test
  void testUpdate() {
    when(userService.saveUser(user)).thenReturn(user);
    UserDTO newSupervisorInDb = userService.saveUser(user);
    assertEquals("Pablo", newSupervisorInDb.getName());
    assertEquals("Perez", newSupervisorInDb.getLastName());
    assertEquals("perez@gmail.com", newSupervisorInDb.getMail());
    assertEquals("perez", newSupervisorInDb.getUserName());
    assertEquals(StringUtils.encodeToString(StringUtils.toSha256("PPerez99")), StringUtils.encodeToString(newSupervisorInDb.getPassword()));
    assertEquals((short) 1, newSupervisorInDb.getProfile().getId());

    when(userService.findByUserName(user.getUserName())).thenReturn(user);
    when(userService.findProfileById(1L)).thenReturn(MockDataProvider.getProfileAdministrator());
    UserDTO userInDb = userService.findByUserName("perez");
    userInDb.setName("NewUser");
    userInDb.setLastName("NewTest");
    userInDb.setMail("new.user.test@gmail.com");
    userInDb.setUserName("NewUserTest");
    userInDb.setPassword(StringUtils.toSha256("NewUserTest99"));
    userInDb.setProfile(userService.findProfileById(Long.valueOf(1)));

    when(userService.saveUser(userInDb)).thenReturn(userInDb);
    
    User updatedUserInDb = new UserConverter().convert(userService.saveUser(userInDb));
    assertEquals("NewUser", updatedUserInDb.getName());
    assertEquals("NewTest", updatedUserInDb.getLastName());
    assertEquals("new.user.test@gmail.com", updatedUserInDb.getMail());
    assertEquals("NewUserTest", updatedUserInDb.getUserName());
    assertEquals(StringUtils.encodeToString(StringUtils.toSha256("NewUserTest99")), StringUtils.encodeToString(updatedUserInDb.getPassword()));
    assertEquals((short) 1, updatedUserInDb.getProfile().getId());

  }
}
