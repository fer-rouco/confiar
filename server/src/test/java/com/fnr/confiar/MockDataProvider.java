package com.fnr.confiar;

import java.util.ArrayList;
import java.util.List;

import com.fnr.confiar.customers.CustomerDTO;
import com.fnr.confiar.users.UserDTO;
import com.fnr.confiar.users.UserProfileDTO;
import com.fnr.confiar.utils.StringUtil;

public class MockDataProvider {
  
  public static UserProfileDTO getProfileAdministrator() {
    UserProfileDTO userProfile = UserProfileDTO.builder().description("Administrador").build();
    userProfile.setId(Short.parseShort("1"));
    return userProfile;
  }

  public static UserProfileDTO getProfileSeller() {
    UserProfileDTO userProfile = UserProfileDTO.builder().description("Vendedor").build();
    userProfile.setId(Short.parseShort("2"));
    return userProfile;
  }

  public static UserProfileDTO getProfileEmployee() {
    UserProfileDTO userProfile = UserProfileDTO.builder().description("Empleado administrativo").build();
    userProfile.setId(Short.parseShort("3"));
    return userProfile;
  }

  public static List<UserProfileDTO> getProfiles() {
    List<UserProfileDTO> userProfiles = new ArrayList<>();
    userProfiles.add(getProfileAdministrator());
    userProfiles.add(getProfileSeller());
    userProfiles.add(getProfileEmployee());
    return userProfiles;
  }

  public static UserDTO getUserAdministrator() {
    UserDTO user = UserDTO.builder()
      .name("Pablo")
      .lastName("Perez")
      .userName("perez")
      .mail("perez@gmail.com")
      .password(StringUtil.toSha256("PPerez99"))
      .profile(getProfileAdministrator())
      .build();
    user.setId(1L);
    return user;
  }
  
  public static UserDTO getUserSeller() {
    UserDTO user = UserDTO.builder()
      .name("Maria")
      .lastName("Suarez")
      .userName("msuarez")
      .mail("msuarez@gmail.com")
      .password(StringUtil.toSha256("MSuarez"))
      .profile(getProfileSeller())
      .build();
    user.setId(2L);
    return user;
  }
    
  public static UserDTO getUserEmployee() {
    UserDTO user = UserDTO.builder()
    .name("Flor")
    .lastName("Martinez")
    .userName("florm")
    .mail("florm@gmail.com")
    .password(StringUtil.toSha256("FlorM"))
    .profile(getProfileEmployee())
    .build();
    user.setId(3L);
    return user;
  }

  public static List<UserDTO> getUsers() {
    List<UserDTO> users = new ArrayList<>();
    users.add(getUserAdministrator());
    users.add(getUserSeller());
    users.add(getUserEmployee());
    return users;
  }
  
  public static CustomerDTO getCustomer() {
    CustomerDTO customer = CustomerDTO.builder()
      .name("Pablo")
      .lastName("Perez")
      .address("Siempre viva 4323")
      .mail("perez@gmail.com")
      .phone("+541161255454")
      .build();
    customer.setId(3L);
    return customer;
  }
    
  public static List<CustomerDTO> getCustomers() {
    List<CustomerDTO> customer = new ArrayList<>();
    customer.add(getCustomer());
    return customer;
  }
}
