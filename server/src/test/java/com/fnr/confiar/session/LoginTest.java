package com.fnr.confiar.session;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.nio.charset.StandardCharsets;
import java.util.Optional;

import com.fnr.confiar.exceptions.InvalidPasswordResponseException;
import com.fnr.confiar.exceptions.ResponseException;
import com.fnr.confiar.exceptions.UserNotFoundResponseException;
import com.fnr.confiar.modules.session.LoginService;
import com.fnr.confiar.modules.session.SessionInfoDTO;
import com.fnr.confiar.modules.users.User;
import com.fnr.confiar.modules.users.UserConverter;
import com.fnr.confiar.modules.users.UserRepository;
import com.google.common.hash.Hashing;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.http.HttpStatus;

// TODO: Mock these tests
@DataJpaTest
public class LoginTest {
  
  @Autowired
  UserRepository userRepository;
  
  @Test
  void testLoginSuccessful() throws UserNotFoundResponseException, InvalidPasswordResponseException {
    LoginService loginService = new LoginService();

    String perezHashedPass = Hashing.sha256().hashString("PPerez99", StandardCharsets.UTF_8).toString();

    User user = userRepository.findByUserName("perez").get();
    SessionInfoDTO loggedUser = loginService.doLogin(new UserConverter().convert(user), perezHashedPass);
    assertEquals("perez" , loggedUser.getUser().getId());
  }
  
  @Test
  void testLoginUserNotFound() throws UserNotFoundResponseException, InvalidPasswordResponseException {
    LoginService loginService = new LoginService();

    String perezHashedPass = Hashing.sha256().hashString("PPerez99", StandardCharsets.UTF_8).toString();

    Optional<User> user = userRepository.findByUserName("perezABC");
    
    ResponseException exception = assertThrows(UserNotFoundResponseException.class, () -> {
      loginService.doLogin(new UserConverter().convert(user), perezHashedPass);
    });

    assertTrue(exception.getField().contains("user"));
    assertEquals(exception.getStatus(), HttpStatus.NOT_FOUND);
    assertEquals(exception.getMessage(), "Usuario no encontrado.");
  }
  
  @Test
  void testLoginWrongPass() throws UserNotFoundResponseException, InvalidPasswordResponseException {
    LoginService loginService = new LoginService();

    String perezHashedWrongPass = Hashing.sha256().hashString("PPPerez999", StandardCharsets.UTF_8).toString();

    User user = userRepository.findByUserName("perez").get();

    ResponseException exception = assertThrows(InvalidPasswordResponseException.class, () -> {
      loginService.doLogin(new UserConverter().convert(user), perezHashedWrongPass);
    });

    assertTrue(exception.getField().contains("password"));
    assertEquals(exception.getStatus(), HttpStatus.FORBIDDEN);
    assertTrue(exception.getMessage().contains("Password"));
  }
}
