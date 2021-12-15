package com.fnr.confiar;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.nio.charset.StandardCharsets;
import java.util.Optional;

import com.google.common.hash.Hashing;
import com.fnr.confiar.entities.User;
import com.fnr.confiar.exceptions.InvalidPasswordResponseException;
import com.fnr.confiar.exceptions.ResponseException;
import com.fnr.confiar.exceptions.UserNotFoundResponseException;
import com.fnr.confiar.models.SessionInfoModel;
import com.fnr.confiar.repositories.UserRepository;
import com.fnr.confiar.services.LoginService;

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

    Optional<User> optionalUser = userRepository.findByUserName("perez");
    SessionInfoModel loggedUser = loginService.doLogin(optionalUser, perezHashedPass);
    assertEquals("perez" , loggedUser.getUser().getId());
  }
  
  @Test
  void testLoginUserNotFound() throws UserNotFoundResponseException, InvalidPasswordResponseException {
    LoginService loginService = new LoginService();

    String perezHashedPass = Hashing.sha256().hashString("PPerez99", StandardCharsets.UTF_8).toString();

    Optional<User> optionalUser = userRepository.findByUserName("perezABC");
    
    ResponseException exception = assertThrows(UserNotFoundResponseException.class, () -> {
      loginService.doLogin(optionalUser, perezHashedPass);
    });

    assertTrue(exception.getField().contains("user"));
    assertEquals(exception.getStatus(), HttpStatus.NOT_FOUND);
    assertEquals(exception.getMessage(), "Usuario no encontrado.");
  }
  
  @Test
  void testLoginWrongPass() throws UserNotFoundResponseException, InvalidPasswordResponseException {
    LoginService loginService = new LoginService();

    String perezHashedWrongPass = Hashing.sha256().hashString("PPPerez999", StandardCharsets.UTF_8).toString();

    Optional<User> optionalUser = userRepository.findByUserName("perez");

    ResponseException exception = assertThrows(InvalidPasswordResponseException.class, () -> {
      loginService.doLogin(optionalUser, perezHashedWrongPass);
    });

    assertTrue(exception.getField().contains("password"));
    assertEquals(exception.getStatus(), HttpStatus.FORBIDDEN);
    assertTrue(exception.getMessage().contains("Password"));
  }
}
