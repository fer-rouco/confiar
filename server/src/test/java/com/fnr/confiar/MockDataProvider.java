package com.fnr.confiar;

import java.util.ArrayList;
import java.util.List;

import com.fnr.confiar.entities.Customer;
import com.fnr.confiar.entities.User;
import com.fnr.confiar.entities.UserProfile;
import com.fnr.confiar.utils.StringUtil;

public class MockDataProvider {
  
  public static UserProfile getProfileAdministrator() {
    return UserProfile.builder().id(1L).description("Administrador").build();
  }

  public static UserProfile getProfileSeller() {
    return UserProfile.builder().id(2L).description("Vendedor").build();
  }

  public static UserProfile getProfileEmployee() {
    return UserProfile.builder().id(3L).description("Empleado administrativo").build();
  }

  public static List<UserProfile> getProfiles() {
    List<UserProfile> userProfiles = new ArrayList<>();
    userProfiles.add(getProfileAdministrator());
    userProfiles.add(getProfileSeller());
    userProfiles.add(getProfileEmployee());
    return userProfiles;
  }

  public static User getUserAdministrator() {
    return User.builder()
      .id(1L)
      .name("Pablo")
      .lastName("Perez")
      .userName("perez")
      .mail("perez@gmail.com")
      .password(StringUtil.toSha256("PPerez99"))
      .profile(getProfileAdministrator())
      .build();
  }
  
  public static User getUserSeller() {
    return User.builder()
      .id(2L)
      .name("Maria")
      .lastName("Suarez")
      .userName("msuarez")
      .mail("msuarez@gmail.com")
      .password(StringUtil.toSha256("MSuarez"))
      .profile(getProfileSeller())
      .build();
  }
    
  public static User getUserEmployee() {
    return User.builder()
      .id(3L)
      .name("Flor")
      .lastName("Martinez")
      .userName("florm")
      .mail("florm@gmail.com")
      .password(StringUtil.toSha256("FlorM"))
      .profile(getProfileEmployee())
      .build();
  }

  public static List<User> getUsers() {
    List<User> users = new ArrayList<>();
    users.add(getUserAdministrator());
    users.add(getUserSeller());
    users.add(getUserEmployee());
    return users;
  }
  
  public static Customer getCustomer() {
    return Customer.builder()
      .id(3L)
      .name("Pablo")
      .lastName("Perez")
      .address("Siempre viva 4323")
      .mail("perez@gmail.com")
      .phone("+541161255454")
      .build();
  }
    
  public static List<Customer> getCustomers() {
    List<Customer> customer = new ArrayList<>();
    customer.add(getCustomer());
    return customer;
  }
}
