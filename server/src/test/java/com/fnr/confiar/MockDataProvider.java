package com.fnr.confiar;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import com.fnr.confiar.entities.User;
import com.fnr.confiar.entities.UserProfile;
import com.google.common.hash.Hashing;

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

  public static User getUserData() {
    String perezHashedPass = Hashing.sha256().hashString("PPerez99", StandardCharsets.UTF_8).toString();
    User user = new User("Pablo", "Perez", "perez", "perez@gmail.com", perezHashedPass, getProfileAdministrator());
    user.setId(1L);
    return user;
  }
}
