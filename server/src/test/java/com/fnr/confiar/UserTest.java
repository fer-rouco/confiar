package com.fnr.confiar;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

import com.fnr.confiar.entities.User;
import com.fnr.confiar.repositories.UserProfileRepository;
import com.fnr.confiar.repositories.UserRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;


@DataJpaTest
public class UserTest {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private UserProfileRepository userProfileRepository;

  private User newUserInstance(short profile) {
    User user = new User();

    // user.setId(1L);
    user.setName("User");
    user.setLastName("Test");
    user.setMail("user.test@gmail.com");
    user.setUserName("UserTest");
    user.setPassword("UserTest99");
    user.setProfile(userProfileRepository.findById(Long.valueOf(profile)).get());

    return user;
  }

  private User newCashierInstance() {
    return newUserInstance((short) 1);
  }

  private User newSupervisorInstance() {
    return newUserInstance((short) 2);
  }

  @Test
  void testCreate() {
    User newUser = newCashierInstance();
    userRepository.save(newUser);
    User userInDb = userRepository.findByUserName(newUser.getUserName()).get();
    assert (newUser == userInDb);
  }

  @Test
  void testDelete() {
    Iterable<User> users = userRepository.findAll();
    assert (15 == ((Collection<User>) users).size());
    User userInDb = userRepository.findById(1L).get();
    userRepository.delete(userInDb);
    users = userRepository.findAll();
    assert (14 == ((Collection<User>) users).size());
    Optional<User> deletedUser = userRepository.findById(1L);
    assert (deletedUser.isPresent() == false);
  }

  @Test
  void testGetUserById() {
    User userInDb = userRepository.findById(1L).get();
    assert (userInDb != null);
    assert (userInDb.getId() == 1L);
  }

  @Test
  void testGetUsers() throws Exception {
    Iterable<User> users = userRepository.findAll();
    assert (15 == ((Collection<User>) users).size());
  }

  @Test
  void testGetUsersByProfile() {
    ArrayList<User> cashiers = userRepository.findByProfile(userProfileRepository.findById(1L).get());
    ArrayList<User> supervisors = userRepository.findByProfile(userProfileRepository.findById(2L).get());
    assert (cashiers.size() == 9);
    assert (supervisors.size() == 6);
  }


  @Test
  void testUpdate() {
    User newSupervisor = newSupervisorInstance();
    User newSupervisorInDb = userRepository.save(newSupervisor);
    assert ("User" == newSupervisorInDb.getName());
    assert ("Test" == newSupervisorInDb.getLastName());
    assert ("user.test@gmail.com" == newSupervisorInDb.getMail());
    assert ("UserTest" == newSupervisorInDb.getUserName());
    assert ("UserTest99" == newSupervisorInDb.getPassword());
    assert ((short) 2 == newSupervisorInDb.getProfile().getId());

    User userInDb = userRepository.findByUserName("UserTest").get();
    userInDb.setName("NewUser");
    userInDb.setLastName("NewTest");
    userInDb.setMail("new.user.test@gmail.com");
    userInDb.setUserName("NewUserTest");
    userInDb.setPassword("NewUserTest99");
    userInDb.setProfile(userProfileRepository.findById(Long.valueOf(1)).get());

    User updatedUserInDb = userRepository.save(userInDb);
    assert ("NewUser" == updatedUserInDb.getName());
    assert ("NewTest" == updatedUserInDb.getLastName());
    assert ("new.user.test@gmail.com" == updatedUserInDb.getMail());
    assert ("NewUserTest" == updatedUserInDb.getUserName());
    assert ("NewUserTest99" == updatedUserInDb.getPassword());
    assert ((short) 1 == updatedUserInDb.getProfile().getId());

  }
}
