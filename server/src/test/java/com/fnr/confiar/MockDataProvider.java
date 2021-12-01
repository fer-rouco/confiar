package com.fnr.confiar;

import java.util.ArrayList;
import java.util.List;

import com.fnr.confiar.entities.User;
import com.fnr.confiar.entities.UserProfile;
import com.fnr.confiar.utils.StringUtil;

public class MockDataProvider {
  
  public static UserProfile getProfileAdministrator() {
    UserProfile profile = new UserProfile("Administrador");
    profile.setId(1L);
    return profile;
  }

  public static UserProfile getProfileSeller() {
    UserProfile profile = new UserProfile("Vendedor");
    profile.setId(2L);
    return profile;
  }

  public static UserProfile getProfileEmployee() {
    UserProfile profile = new UserProfile("Empleado administrativo");
    profile.setId(3L);
    return profile;
  }

  public static List<UserProfile> getProfiles() {
    List<UserProfile> userProfiles = new ArrayList<>();
    userProfiles.add(getProfileAdministrator());
    userProfiles.add(getProfileSeller());
    userProfiles.add(getProfileEmployee());
    return userProfiles;
  }

  public static User getUserAdministrator() {
    String hashedPass = StringUtil.toSha256("PPerez99");
    User user = new User("Pablo", "Perez", "perez", "perez@gmail.com", hashedPass, getProfileAdministrator());
    user.setId(1L);
    return user;
  }
  
  public static User getUserSeller() {
    String hashedPass = StringUtil.toSha256("MSuarez");
    User user = new User("Maria", "Suarez", "msuarez", "msuarez@gmail.com", hashedPass, getProfileSeller());
    user.setId(1L);
    return user;
  }
    
  public static User getUserEmployee() {
    String hashedPass = StringUtil.toSha256("FlorM");
    User user = new User("Flor", "Martinez", "florm", "florm@gmail.com", hashedPass, getProfileEmployee());
    user.setId(1L);
    return user;
  }

  public static List<User> getUsers() {
    List<User> users = new ArrayList<>();
    users.add(getUserAdministrator());
    users.add(getUserSeller());
    users.add(getUserEmployee());
    return users;
  }
}
