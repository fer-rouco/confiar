package com.ncr.challenge;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.nio.charset.StandardCharsets;
import java.util.Optional;

import com.google.common.hash.Hashing;
import com.ncr.challenge.entities.User;
import com.ncr.challenge.exceptions.InvalidPasswordResponseException;
import com.ncr.challenge.exceptions.ResponseException;
import com.ncr.challenge.exceptions.UserNotFoundResponseException;
import com.ncr.challenge.models.SessionInfoModel;
import com.ncr.challenge.repositories.UserRepository;
import com.ncr.challenge.services.LoginService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.http.HttpStatus;


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
