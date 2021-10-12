package com.fnr.confiar.controllers;

import java.util.Optional;

import com.fnr.confiar.Response;
import com.fnr.confiar.entities.User;
import com.fnr.confiar.exceptions.InvalidPasswordResponseException;
import com.fnr.confiar.exceptions.UserNotFoundResponseException;
import com.fnr.confiar.models.SessionInfoModel;
import com.fnr.confiar.services.LoginService;
import com.fnr.confiar.services.UserService;

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
