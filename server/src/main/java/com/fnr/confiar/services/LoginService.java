package com.fnr.confiar.services;

import java.util.Optional;

import com.fnr.confiar.entities.User;
import com.fnr.confiar.exceptions.InvalidPasswordResponseException;
import com.fnr.confiar.exceptions.UserNotFoundResponseException;
import com.fnr.confiar.models.SessionInfoModel;

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
