package com.ncr.challenge.controllers;

import java.util.Optional;

import com.ncr.challenge.Response;
import com.ncr.challenge.entities.User;
import com.ncr.challenge.exceptions.InvalidPasswordResponseException;
import com.ncr.challenge.exceptions.UserNotFoundResponseException;
import com.ncr.challenge.models.SessionInfoModel;
import com.ncr.challenge.services.LoginService;
import com.ncr.challenge.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/session")
public class SessionController extends BaseController {
  @Autowired
  LoginService loginService;

  @Autowired
  UserService userService;

  @GetMapping()
  public ResponseEntity<Response> getCurrentSessionInfo() {
    SessionInfoModel sessionInfo = SessionInfoModel.getInstance();
    return this.responseOk(sessionInfo);
  }

  @GetMapping(path = "/login")
  public ResponseEntity<Response> login(@RequestParam("user") String userOrMail, @RequestParam("password") String password) {
    ResponseEntity<Response> response = null;
    SessionInfoModel sessionInfo = null;

    Optional<User> optionalUser = (!userOrMail.contains("@")) ? userService.findByUserName(userOrMail) : userService.findByMail(userOrMail);
    try {
      sessionInfo = loginService.doLogin(optionalUser, password);
      response = responseOk(sessionInfo);
    }
    catch (UserNotFoundResponseException | InvalidPasswordResponseException responseException) {
      response = buildResponseFromException(responseException, sessionInfo);
    }

    return response;
  }

  @GetMapping(path = "/logout")
  public ResponseEntity<Response> logout() {
    ResponseEntity<Response> response = null;

    SessionInfoModel sessionInfo = SessionInfoModel.getInstance();
    sessionInfo.setUser(null);
    response = responseOk(sessionInfo);

    return response;
  }

}
