package com.ncr.challenge.services;

import java.util.Optional;

import com.ncr.challenge.entities.User;
import com.ncr.challenge.exceptions.InvalidPasswordResponseException;
import com.ncr.challenge.exceptions.UserNotFoundResponseException;
import com.ncr.challenge.models.SessionInfoModel;

import org.springframework.stereotype.Service;

@Service
public class LoginService {
  
  public SessionInfoModel doLogin(Optional<User> optionalUser, String password) throws UserNotFoundResponseException, InvalidPasswordResponseException {
    User user = null;

    if (!optionalUser.isEmpty()) {
      user = optionalUser.get();
    }
    else {
      throw new UserNotFoundResponseException();
    }

    if (user != null && password.compareTo(user.getPassword()) != 0) {
      throw new InvalidPasswordResponseException();
    }

    SessionInfoModel sessionInfo = SessionInfoModel.getInstance();
    sessionInfo.setUser(new SessionInfoModel.UserInfoData()); 
    sessionInfo.getUser().setId(user.getUserName());

    return sessionInfo;
  }
  
}
