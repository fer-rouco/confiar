package com.fnr.confiar;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import com.fnr.confiar.entities.User;
import com.fnr.confiar.entities.UserProfile;
import com.fnr.confiar.services.UserService;
import com.fnr.confiar.utils.StringUtil;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.mock.mockito.MockBean;


@DataJpaTest
public class UserTest {
  @MockBean
  private UserService userService;
  
  private User user;

  @BeforeEach
  void init() {
    user = MockDataProvider.getUserAdministrator();
  }
  

  @Test
  void testCreate() {
    when(userService.saveUser(user)).thenReturn(null);
    when(userService.findByUserName(user.getUserName())).thenReturn(Optional.of(user));
    userService.saveUser(user);
    User userInDb = userService.findByUserName(user.getUserName()).get();
    assert (user == userInDb);
  }

  @Test
  void testDelete() {
    when(userService.countUsers()).thenReturn(15L);
    assert (15 == userService.countUsers());
    userService.deleteUser(1L);
    when(userService.countUsers()).thenReturn(14L);
    assert (14 == userService.countUsers());
    when(userService.findById(1L)).thenReturn(Optional.empty());
    Optional<User> deletedUser = userService.findById(1L);
    assert (deletedUser.isPresent() == false);
  }

  @Test
  void testGetUserById() {
    when(userService.findById(1L)).thenReturn(Optional.of(user));
    User userInDb = userService.findById(1L).get();
    assert (userInDb != null);
    assert (userInDb.getId() == 1L);
  }

  @Test
  void testGetUsers() throws Exception {
    List<User> usersMock = MockDataProvider.getUsers();
    usersMock.addAll(MockDataProvider.getUsers());
    usersMock.addAll(MockDataProvider.getUsers());
    usersMock.addAll(MockDataProvider.getUsers());
    usersMock.addAll(MockDataProvider.getUsers());
    when(userService.findAll()).thenReturn(usersMock);
    Iterable<User> users = userService.findAll();
    assert (15 == ((Collection<User>) users).size());
  }

  @Test
  void testGetUsersByProfile() {
    UserProfile administratorMock = MockDataProvider.getProfileAdministrator();
    UserProfile sellerMock = MockDataProvider.getProfileSeller();

    List<User> cashiersMock = MockDataProvider.getUsers();
    cashiersMock.addAll(MockDataProvider.getUsers());
    cashiersMock.addAll(MockDataProvider.getUsers());

    List<User> supervisorsMock = MockDataProvider.getUsers();
    supervisorsMock.addAll(MockDataProvider.getUsers());

    when(userService.findProfileById(1L)).thenReturn(Optional.of(administratorMock));
    when(userService.findProfileById(2L)).thenReturn(Optional.of(sellerMock));
    when(userService.findByProfile(administratorMock)).thenReturn(cashiersMock);
    when(userService.findByProfile(sellerMock)).thenReturn(supervisorsMock);

    List<User> cashiers = userService.findByProfile(userService.findProfileById(1L).get());
    List<User> supervisors = userService.findByProfile(userService.findProfileById(2L).get());
    assert (cashiers.size() == 9);
    assert (supervisors.size() == 6);
  }

  @Test
  void testUpdate() {
    when(userService.saveUser(user)).thenReturn(user);
    User newSupervisorInDb = userService.saveUser(user);
    assertEquals("Pablo", newSupervisorInDb.getName());
    assertEquals("Perez", newSupervisorInDb.getLastName());
    assertEquals("perez@gmail.com", newSupervisorInDb.getMail());
    assertEquals("perez", newSupervisorInDb.getUserName());
    assertEquals(StringUtil.toSha256("PPerez99"), newSupervisorInDb.getPassword());
    assertEquals((short) 1, newSupervisorInDb.getProfile().getId());

    when(userService.findByUserName(user.getUserName())).thenReturn(Optional.of(user));
    when(userService.findProfileById(1L)).thenReturn(Optional.of(MockDataProvider.getProfileAdministrator()));
    User userInDb = userService.findByUserName("perez").get();
    userInDb.setName("NewUser");
    userInDb.setLastName("NewTest");
    userInDb.setMail("new.user.test@gmail.com");
    userInDb.setUserName("NewUserTest");
    userInDb.setPassword("NewUserTest99");
    userInDb.setProfile(userService.findProfileById(Long.valueOf(1)).get());

    when(userService.saveUser(userInDb)).thenReturn(userInDb);
    User updatedUserInDb = userService.saveUser(userInDb);
    assertEquals("NewUser", updatedUserInDb.getName());
    assertEquals("NewTest", updatedUserInDb.getLastName());
    assertEquals("new.user.test@gmail.com", updatedUserInDb.getMail());
    assertEquals("NewUserTest", updatedUserInDb.getUserName());
    assertEquals("NewUserTest99", updatedUserInDb.getPassword());
    assertEquals((short) 1, updatedUserInDb.getProfile().getId());

  }
}
