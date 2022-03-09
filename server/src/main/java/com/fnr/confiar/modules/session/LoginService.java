package com.fnr.confiar.modules.session;

import com.fnr.confiar.exceptions.InvalidPasswordResponseException;
import com.fnr.confiar.exceptions.UserNotFoundResponseException;
import com.fnr.confiar.modules.users.UserDTO;
import com.fnr.confiar.utils.StringUtils;

import org.springframework.stereotype.Service;

@Service
public class LoginService {
  
  public SessionInfoDTO doLogin(UserDTO user, String password) throws UserNotFoundResponseException, InvalidPasswordResponseException {
    if (user == null) {
      throw new UserNotFoundResponseException();
    }

    if (user != null && password.compareTo(StringUtils.fromSha256(user.getPassword())) != 0) {
      throw new InvalidPasswordResponseException();
    }

    SessionInfoDTO sessionInfo = SessionInfoDTO.getInstance();
    sessionInfo.setUser(new SessionInfoDTO.UserInfoData()); 
    sessionInfo.getUser().setId(user.getUserName());

    return sessionInfo;
  }
  
}
